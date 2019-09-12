<template>
    <div class="main section">
        <div class="container">
            <div class="containedWidth">

                <div>my nickername: {{ nickname }}</div>
                <div>my role: {{ character }}</div>
                <br/>

                <Intro v-if="stepOne"/>
                <Lobby v-if="lobbyStep" :players="players" :roomId="roomId"/>
                <PlayerInfo v-if="stepTwo" :character="character" :badGuys="badGuys"/>

                <div v-show="!teamHasWon">
                    <QuestInfo v-if="questInfoDisplay" :quests="quests"/>

                    <div v-show="questInfoDisplay" class="cssWrapper">
                        <div v-show="!activeMissionNotCurrent" id="currentMissionScreens">
                            <ProposeMissionMenu v-if="proposeMissionParty" :missionLeader="missionLeader"
                                                :currentMissionPartySize="currentMissionPartySize"/>
                            <ProposedPartyVoteMenu v-if="proposedPartyVote" :proposed-party="proposedParty"/>
                            <PassFailVote v-if="passFailVote" :missionParty="proposedParty"/>
                            <DisplayPassFailVoteResults v-if="displayPassFailVoteResults" :passVotes="passVotes"
                                                        :failVotes="failVotes"/>
                            <AssassinVote v-if="assassinVote" :assassinVoteData="assassinVoteData"></AssassinVote>
                        </div>

                        <NotCurrentMissionData v-if="activeMissionNotCurrent" :activeQuestData="activeQuestData"/>
                    </div>
                </div>

                <Winner v-if="teamHasWon" :gameOverData="gameOverData"/>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../store/index.js"
    import Intro from "../components/Intro"
    import PlayerInfo from "../components/PlayerInfo"
    import QuestInfo from "../components/QuestInfo";
    import Lobby from "../components/Lobby";
    import ProposeMissionMenu from "../components/ProposeMissionMenu";
    import ProposedPartyVoteMenu from "../components/ProposedPartyVoteMenu";
    import PassFailVote from "../components/PassFailVote";
    import DisplayPassFailVoteResults from "../components/DisplayPassFailVoteResults";
    import Winner from "../components/Winner";
    import AssassinVote from "../components/AssassinVote";
    import NotCurrentMissionData from "../components/NotCurrentMissionData";

    export default {
        name: 'home',
        components: {
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
                character: "",
                badGuys: [],
                missionLeader: "",
                missionNumber: 1,
                numberInParty: 0,
                quests: [],
                proposedParty: [],
                passVotes: 0,
                failVotes: 0,
                assassinVoteData: {},
                gameOverData: {},
            }
        },
        computed: {
            stepOne: function () {
                return store.getters.getStepOne
            },
            lobbyStep: function () {
                return store.getters.getLobbyStep
            },
            stepTwo: function () {
                return store.getters.getStepTwo
            },
            questInfoDisplay: function () {
                return store.getters.getQuestInfoDisplay
            },
            proposeMissionParty: function () {
                return store.getters.getProposeMissionParty
            },
            proposedPartyVote: function () {
                return store.getters.getProposedPartyVote
            },
            passFailVote: function () {
                return store.getters.getPassFailVote
            },
            displayPassFailVoteResults: function () {
                return store.getters.getDisplayPassFailVoteResults
            },
            assassinVote: function () {
                return store.getters.getAssassinVote
            },
            teamHasWon: function () {
                return store.getters.getBadGuysWin || store.getters.getGoodGuysWin
            },
            currentMissionPartySize: function () {
                return this.quests[this.missionNumber - 1].numberOfAdventurers
            },
            nickname: function () {
                return store.getters.getNickname
            },
            activeMissionNotCurrent: function () {
                return store.state.activeMission !== this.missionNumber
            },
            activeQuestData: function () {
                return this.quests[store.state.activeMission - 1]
            }
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)
                console.log(msgJSON)

                if (msgJSON.event === 'MoveToLobby') {
                    store.dispatch('stepOneToLobbyStep')
                    this.players = msgJSON.players
                    this.roomId = msgJSON.roomId
                } else if (msgJSON.event === 'ChangeInLobby') {
                    this.players = msgJSON.players
                } else if (msgJSON.event === 'PlayerInfo') {
                    store.commit('setPlayers', this.players)
                    this.character = msgJSON.character
                    this.badGuys = msgJSON.badGuys
                    store.dispatch("lobbyStepToStepTwo")
                } else if (msgJSON.event === 'TeamAssignmentPhase') {
                    store.state.activeMission = msgJSON.missionNumber
                    this.missionLeader = msgJSON.missionLeader
                    this.missionNumber = msgJSON.missionNumber
                    this.quests = msgJSON.missions
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
            }
        }
    }
</script>

<style>
    .section {
        padding-top: 3rem;
        padding-right: 1.5rem;
        padding-bottom: 0rem;
        padding-left: 1.5rem;
    }
    .cssWrapper {
        border-bottom: #b0912a 5px solid;
        border-left: #b0912a 2.5px solid;
        border-right: #b0912a 2.5px solid;
        padding: 1.5rem 3rem;
        margin-left: .75rem;
        margin-right: .75rem;
        margin-top: -2.5rem;
        background: #5a596b;
    }

    .containedWidth {
        margin: auto;
        max-width: 65%;
    }

    .main {
        text-align: center
    }
</style>
