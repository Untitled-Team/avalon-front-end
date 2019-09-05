<template>
    <div class="home">
        <Intro v-if="stepOne"/>
        <Lobby v-if="lobbyStep" :players="players" :roomId="roomId"/>
        <PlayerInfo v-if="stepTwo" :character="character" :badGuys="badGuys"/>
        <QuestInfo v-if="questInfoDisplay" :missions="missions"/>
        <ProposeMissionMenu v-if="proposeMissionParty" :missionLeader="missionLeader"/>
    </div>
</template>

<script>
    import store from "../store/index.js"
    import Intro from "../components/Intro"
    import PlayerInfo from "../components/PlayerInfo"
    import QuestInfo from "../components/QuestInfo";
    import Lobby from "../components/Lobby";
    import ProposeMissionMenu from "../components/ProposeMissionMenu";

    export default {
        name: 'home',
        components: {
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
                missionNumber: 0,
                numberInParty: 0,
                missions: [],
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
                return store.getters.proposeMissionParty
            },
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)
                if (msgJSON.action === 'MoveToLobby') {
                    store.dispatch('stepOneToLobbyStep')
                    this.players = msgJSON.players
                    this.roomId = msgJSON.roomId
                } else if (msgJSON.action === 'ChangeInLobby') {
                    this.players = msgJSON.players
                } else if (msgJSON.action === 'PlayerInfo') {
                    this.character = msgJSON.character
                    this.badGuys = msgJSON.badGuys
                    store.dispatch("lobbyStepToStepTwo")
                } else if (msgJSON.action === 'TeamAssignmentPhase') {
                    this.missionLeader = msgJSON.missionLeader
                    this.missionNumber = msgJSON.missionLeader
                    this.missions = msgJSON.missions
                    store.dispatch("stepTwoToQuestPhase")
                }
            }
        }
    }
</script>

<style>
</style>
