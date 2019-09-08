<template>
    <div class="home">
        my nickername: {{ nickname }}
        <br/>
        <Intro v-if="stepOne"/>
        <Lobby v-if="lobbyStep" :players="players" :roomId="roomId"/>
        <PlayerInfo v-if="stepTwo" :character="character" :badGuys="badGuys"/>
        <QuestInfo v-if="questInfoDisplay" :missions="missions"/>
        <ProposeMissionMenu v-if="proposeMissionParty" :missionLeader="missionLeader"
                            :currentMissionPartySize="currentMissionPartySize"/>
        <ProposedPartyVoteMenu v-if="proposedPartyVote" :proposed-party="proposedParty"/>
        <PassFailVote v-if="passFailVote" :missionParty="proposedParty"/>
        <DisplayPassFailVoteResults v-if="displayPassFailVoteResults" :passVotes="passVotes" :failVotes="failVotes"/>
        <AssassinVote v-if="assassinVote" :assassinVoteData="assassinVoteData"></AssassinVote>
        <Winner v-if="teamHasWon" :gameOverData="gameOverData"/>

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

    export default {
        name: 'home',
        components: {
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
                missions: [],
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
                return this.missions[this.missionNumber - 1].numberOfAdventurers
            },
            nickname: function () {
                return store.getters.getNickname
            },
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)
                console.log(msgJSON)

                if (msgJSON.action === 'MoveToLobby') {
                    store.dispatch('stepOneToLobbyStep')
                    this.players = msgJSON.players
                    this.roomId = msgJSON.roomId
                } else if (msgJSON.action === 'ChangeInLobby') {
                    this.players = msgJSON.players
                } else if (msgJSON.action === 'PlayerInfo') {
                    store.commit('setPlayers', this.players)
                    this.character = msgJSON.character
                    this.badGuys = msgJSON.badGuys
                    store.dispatch("lobbyStepToStepTwo")
                } else if (msgJSON.action === 'TeamAssignmentPhase') {
                    this.missionLeader = msgJSON.missionLeader
                    this.missionNumber = msgJSON.missionNumber
                    this.missions = msgJSON.missions
                    if (this.proposedPartyVote) {
                        store.dispatch("ToggleProposeMissionPartyAndProposedPartyVote")
                    } else if (this.displayPassFailVoteResults) {
                        store.dispatch("displayPassFailVoteResultsToProposeMissionParty")
                    } else {
                        store.dispatch("stepTwoToQuestPhase")
                    }
                } else if (msgJSON.action === 'ProposedParty') {
                    this.proposedParty = msgJSON.proposedParty
                    store.dispatch("ToggleProposeMissionPartyAndProposedPartyVote")
                } else if (msgJSON.action === 'PartyApproved') {
                    store.dispatch("ProposedPartyVoteToPassFailVote")
                } else if (msgJSON.action === 'PassFailVoteResults') {
                    this.passVotes = msgJSON.passVotes
                    this.failVotes = msgJSON.failVotes
                    store.dispatch("PassFailVoteToDisplayPassFailVoteResults")
                } else if (msgJSON.action === 'AssassinVote') {
                    this.assassinVoteData = msgJSON.assassinVoteData
                    store.dispatch("displayPassFailVoteResultsToAssassinVote")
                } else if (msgJSON.action === 'GameOver') {
                    this.gameOverData = msgJSON.gameOverData
                    if (msgJSON.gameOverData.winningTeam === "BadGuys") {
                        if (this.assassinVote) {
                            console.log("got here")
                            store.dispatch("assassinVoteToBadGuysWin")
                        } else {
                            console.log("DID NOT GET EHRE!!!")
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
    .home {
        text-align: center;
    }
</style>
