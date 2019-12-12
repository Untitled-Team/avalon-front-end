<template>
    <div class="main">
        <Intro v-if="intro"/>
        <Lobby v-if="lobby"/>
        <PlayerInfo v-if="playerInfo"/>

        <div v-show="!teamHasWon && !lobby && !intro && !playerInfo" class="containedWidth">
            <QuestInfo v-if="questInfoDisplay"/>
            <TeamVotes v-if="teamVotesDisplay"/>

            <div v-show="questInfoDisplay" class="cssWrapper">
                <AssassinVote v-if="assassinVote"/>

                <div v-show="activeMissionAlsoCurrent" id="currentMissionScreens" class="currentMissions">
                    <ProposeMissionMenu v-if="proposeMissionParty"/>
                    <ProposedPartyVoteMenu v-if="proposedPartyVote"/>
                    <PassFailVote v-if="passFailVote"/>
                    <DisplayPassFailVoteResults v-if="displayPassFailVoteResults"/>
                </div>

                <NotCurrentMissionData v-if="!activeMissionAlsoCurrent"/>
                <NicknameCharacterBadGuys v-if="questInfoDisplay"/>
            </div>
        </div>
        <Winner v-if="teamHasWon"/>
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
    import TeamVotes from "../components/TeamVotes";

    export default {
        name: 'home',
        components: {
            NicknameCharacterBadGuys,
            NotCurrentMissionData,
            AssassinVote,
            Winner,
            DisplayPassFailVoteResults,
            PassFailVote,
            TeamVotes,
            ProposedPartyVoteMenu,
            ProposeMissionMenu,
            QuestInfo,
            PlayerInfo,
            Intro,
            Lobby,
        },
        computed: {
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
            teamVotesDisplay: function () {
                return store.state.gameState.teamVotesDisplay
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
            activeMissionAlsoCurrent: function () {
                return store.state.activeMission === store.state.currentMission
            },
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)
                console.log(msgJSON)

                if (msgJSON.event === 'MoveToLobby') {
                    store.dispatch('introToLobbyStep')
                    store.state.players = msgJSON.players
                    store.state.roomId = msgJSON.roomId
                } else if (msgJSON.event === 'ChangeInLobby') {
                    store.state.players = msgJSON.players
                } else if (msgJSON.event === 'PlayerInfo') {
                    store.state.character = msgJSON.character
                    store.state.badGuys = msgJSON.badGuys
                    store.dispatch("lobbyStepToStepTwo")
                } else if (msgJSON.event === 'TeamAssignmentPhase') {
                    //reset the playerHasVoted property so players can approve or deny the next party.
                    this.$store.state.ProposedPartyVoteMenu.playerHasVoted = false

                    this.$store.state.ProposeMissionMenu.proposalsLeft = msgJSON.proposalsLeft
                    this.$store.state.nextMissionLeader = msgJSON.nextMissionLeader
                    store.state.activeMission = msgJSON.missionNumber
                    store.state.currentMissionLeader = msgJSON.missionLeader
                    store.state.missions = msgJSON.missions
                    store.state.currentMission = msgJSON.missionNumber
                    if (this.proposedPartyVote) {
                        store.dispatch("ToggleProposeMissionPartyAndProposedPartyVote")
                    } else if (this.displayPassFailVoteResults) {
                        store.dispatch("displayPassFailVoteResultsToProposeMissionParty")
                    }
                } else if (msgJSON.event === 'PartyVotes') {
                    this.$store.state.gameState.teamVotesDisplay = true
                    this.$store.state.TeamVotesData.approved = msgJSON.approvals
                    this.$store.state.TeamVotesData.denied = msgJSON.denies
                    this.$store.state.TeamVotesData.missionLeader = this.$store.state.currentMissionLeader

                } else if (msgJSON.event === 'ProposedParty') {
                    store.state.ProposedPartyVoteMenu.proposedParty = msgJSON.proposedParty
                    if (!store.state.gameState.playerInfo) {
                        store.dispatch("ToggleProposeMissionPartyAndProposedPartyVote")
                    }

                } else if (msgJSON.event === 'PartyApproved') {
                    store.dispatch("ProposedPartyVoteToPassFailVote")
                } else if (msgJSON.event === 'PassFailVoteResults') {
                    //after the vote results have come in, every players "playerHasVoted status is reset
                    this.$store.state.PassFailVote.playerHasVoted = false

                    store.state.DisplayPassFailVoteResults.passVotes = msgJSON.passVotes
                    store.state.DisplayPassFailVoteResults.failVotes = msgJSON.failVotes
                    store.dispatch("PassFailVoteToDisplayPassFailVoteResults")
                } else if (msgJSON.event === 'AssassinVote') {
                    store.state.activeMission = store.state.currentMission
                    store.state.currentMission = null
                    store.state.missions = msgJSON.missions
                    store.state.assassinVote.assassinVoteData = msgJSON.assassinVoteData
                    store.dispatch("displayPassFailVoteResultsToAssassinVote")
                } else if (msgJSON.event === 'GameOver') {
                    store.state.Winner.gameOverData = msgJSON.gameOverData
                    if (msgJSON.gameOverData.winningTeam === "BadGuys") {
                        if (this.assassinVote) {
                            store.dispatch("assassinVoteToBadGuysWin")
                        } else {
                            store.dispatch("displayPassFailVoteResultsToBadGuysWin")
                        }
                    } else if (msgJSON.gameOverData.winningTeam === "GoodGuys") {
                        store.dispatch("assassinVoteToGoodGuysWin")
                    }
                } else if (msgJSON.event === 'GameNoLongerExists') {
                    this.$store.commit("resetState");
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
