<template>
    <div class="main">
        <Intro v-if="intro"/>
        <Lobby v-if="lobby" :players="players" :roomId="roomId"/>
        <PlayerInfo v-if="playerInfo"/>

        <div v-show="!teamHasWon && !lobby && !intro && !playerInfo" class="containedWidth">
            <QuestInfo v-if="questInfoDisplay"/>

            <div v-show="questInfoDisplay" class="cssWrapper">
                <AssassinVote v-if="assassinVote" :assassinVoteData="assassinVoteData"
                              :activeQuestData="activeQuestData"></AssassinVote>

                <div v-show="!activeMissionNotCurrent" id="currentMissionScreens" class="currentMissions">
                    <ProposeMissionMenu v-if="proposeMissionParty" :currentMissionPartySize="currentMissionPartySize"/>
                    <ProposedPartyVoteMenu v-if="proposedPartyVote" :proposed-party="proposedParty"/>
                    <PassFailVote v-if="passFailVote" :missionParty="proposedParty"/>
                    <DisplayPassFailVoteResults v-if="displayPassFailVoteResults" :passVotes="passVotes"
                                                :failVotes="failVotes"/>
                </div>

                <NotCurrentMissionData v-if="activeMissionNotCurrent" :activeQuestData="activeQuestData"/>
                <NicknameCharacterBadGuys :bad-guys="badGuys" v-if="questInfoDisplay"/>
            </div>
        </div>
        <Winner v-if="teamHasWon" :gameOverData="gameOverData"/>
    </div>
</template>

<script>
    import store from "../store/index.js"
    import Intro from "../components/Intro"
    import PlayerInfo from "../components/PlayerInfo"
    import QuestInfo from "../components/QuestInfo"
    import Lobby from "../components/Lobby"
    import ProposeMissionMenu from "../components/ProposeMissionMenu"
    import ProposedPartyVoteMenu from "../components/ProposedPartyVoteMenu"
    import PassFailVote from "../components/PassFailVote"
    import DisplayPassFailVoteResults from "../components/DisplayPassFailVoteResults"
    import Winner from "../components/Winner"
    import AssassinVote from "../components/AssassinVote"
    import NotCurrentMissionData from "../components/NotCurrentMissionData"
    import NicknameCharacterBadGuys from "../components/NicknameCharacterBadGuys";

    export default {
        name: 'home',
        components: {
            NicknameCharacterBadGuys,
            NotCurrentMissionData,
            AssassinVote,
            Winner,
            DisplayPassFailVoteResults,
            PassFailVote,
            ProposedPartyVoteMenu,
            ProposeMissionMenu,
            QuestInfo,
            PlayerInfo,
            Intro,
            Lobby,
        },
        data: function () {
            return {
                players: [],
                roomId: null,
                missionNumber: 1,
                numberInParty: 0,
                proposedParty: [],
                passVotes: 0,
                failVotes: 0,
                assassinVoteData: {},
                gameOverData: {},
            }
        },
        computed: {
            badGuys: function () {
                return store.state.badGuys
            },
            intro: function () {
                return store.state.gameState.intro
            },
            lobby: function () {
                return store.state.gameState.lobby
            },
            playerInfo: function () {
                return store.state.gameState.playerInfo
            },
            questInfoDisplay: function () {
                return store.state.gameState.questInfoDisplay
            },
            proposeMissionParty: function () {
                return store.state.gameState.proposeMissionParty
            },
            proposedPartyVote: function () {
                return store.state.gameState.proposedPartyVote
            },
            passFailVote: function () {
                return store.state.gameState.passFailVote
            },
            displayPassFailVoteResults: function () {
                return store.state.gameState.displayPassFailVoteResults
            },
            assassinVote: function () {
                return store.state.gameState.assassinVote
            },
            teamHasWon: function () {
                return store.state.gameState.badGuysWin || store.state.gameState.goodGuysWin
            },
            currentMissionPartySize: function () {
                return store.state.missions[this.missionNumber - 1].numberOfAdventurers
            },
            nickname: function () {
                return store.getters.getNickname
            },
            activeMissionNotCurrent: function () {
                //todo!!!
                return store.state.activeMission !== this.missionNumber
            },
            activeQuestData: function () {
                return store.state.missions[store.state.activeMission - 1]
            },
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)
                console.log(msgJSON)

                if (msgJSON.event === 'MoveToLobby') {
                    store.dispatch('introToLobbyStep')
                    this.players = msgJSON.players
                    this.roomId = msgJSON.roomId
                    store.roomId = this.roomId
                } else if (msgJSON.event === 'ChangeInLobby') {
                    this.players = msgJSON.players
                } else if (msgJSON.event === 'PlayerInfo') {
                    this.store.players = this.players
                    store.state.character = msgJSON.character
                    store.state.badGuys = msgJSON.badGuys
                    store.dispatch("lobbyStepToStepTwo")
                } else if (msgJSON.event === 'TeamAssignmentPhase') {
                    store.state.activeMission = msgJSON.missionNumber
                    this.missionNumber = msgJSON.missionNumber
                    store.state.currentMissionLeader = msgJSON.missionLeader
                    store.state.missions = msgJSON.missions
                    store.state.currentMission = msgJSON.missionNumber
                    if (this.proposedPartyVote) {
                        store.dispatch("ToggleProposeMissionPartyAndProposedPartyVote")
                    } else if (this.displayPassFailVoteResults) {
                        store.dispatch("displayPassFailVoteResultsToProposeMissionParty")
                    } else {
                        store.dispatch("stepTwoToQuestPhase")
                    }
                } else if (msgJSON.event === 'ProposedParty') {
                    this.proposedParty = msgJSON.proposedParty
                    store.dispatch("ToggleProposeMissionPartyAndProposedPartyVote")
                } else if (msgJSON.event === 'PartyApproved') {
                    store.dispatch("ProposedPartyVoteToPassFailVote")
                } else if (msgJSON.event === 'PassFailVoteResults') {
                    this.passVotes = msgJSON.passVotes
                    this.failVotes = msgJSON.failVotes
                    store.dispatch("PassFailVoteToDisplayPassFailVoteResults")
                } else if (msgJSON.event === 'AssassinVote') {
                    this.assassinVoteData = msgJSON.assassinVoteData
                    store.dispatch("displayPassFailVoteResultsToAssassinVote")
                } else if (msgJSON.event === 'GameOver') {
                    this.gameOverData = msgJSON.gameOverData
                    if (msgJSON.gameOverData.winningTeam === "BadGuys") {
                        if (this.assassinVote) {
                            store.dispatch("assassinVoteToBadGuysWin")
                        } else {
                            store.dispatch("displayPassFailVoteResultsToBadGuysWin")
                        }
                    } else if (msgJSON.gameOverData.winningTeam === "GoodGuys") {
                        store.dispatch("assassinVoteToGoodGuysWin")
                    }
                }

                store.commit('setLastEventId', msgJSON.id)
            }
        },
        mounted() {
            document.addEventListener('touchmove', function (event) {
                event.preventDefault();
            }, {passive: false});
        },
        destroyed() {
            window.removeEventListener('touchmove', function (event) {
                event.preventDefault();
            }, false);
        }
    }
</script>

<style lang="scss">
    @import "../styles/variables";

    .cssWrapper {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        background: #848484;
    }

    .containedWidth {
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    .main {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .currentMissions {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        background: $current;
    }
</style>
