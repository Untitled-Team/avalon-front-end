<template>
    <div class="home">
        my nicknername: {{ nickname }}
        <br />
        <Intro v-if="stepOne"/>
        <Lobby v-if="lobbyStep" :players="players" :roomId="roomId"/>
        <PlayerInfo v-if="stepTwo" :character="character" :badGuys="badGuys"/>
        <QuestInfo v-if="questInfoDisplay" :missions="missions"/>
        <ProposeMissionMenu v-if="proposeMissionParty" :missionLeader="missionLeader"
                            :currentMissionPartySize="currentMissionPartySize"/>
        <ProposedPartyVoteMenu v-if="proposedPartyVote" :proposed-party="proposedParty"/>
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

    export default {
        name: 'home',
        components: {
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
                    } else {
                        store.dispatch("stepTwoToQuestPhase")
                    }
                } else if (msgJSON.action === 'ProposedParty') {
                    this.proposedParty = msgJSON.proposedParty
                    store.dispatch("ToggleProposeMissionPartyAndProposedPartyVote")
                } else if (msgJSON.action === 'PartyApproved') {
                    console.log('Party Approved :)')
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
