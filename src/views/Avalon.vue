<template>
    <div class="home">
        <Intro v-if="stepOne"/>
        <Lobby v-if="lobbyStep" :players="players" :roomId="roomId"/>
        <PlayerInfo v-if="stepTwo" :character="this.character" :badGuys="this.badGuys"/>
        <QuestInfo v-if="questInfoDisplay"/>
    </div>
</template>

<script>
    import store from "../store/index.js"
    import Intro from "../components/Intro"
    import PlayerInfo from "../components/PlayerInfo"
    import QuestInfo from "../components/QuestInfo";
    import Lobby from "../components/Lobby";

    export default {
        name: 'home',
        components: {
            QuestInfo,
            PlayerInfo,
            Intro,
            Lobby,
        },
        data: function() {
                return {
                    players: [],
                    character: "",
                    missionLeader: "",
                    badGuys: [],
                    roomId: null,
                }
            },
        computed: {
            stepOne: function() {
                return store.getters.getStepOne
            },
            lobbyStep: function() {
                return store.getters.getLobbyStep
            },
            stepTwo: function() {
                return store.getters.getStepTwo
            },
            questInfoDisplay: function() {
                return store.getters.getQuestInfoDisplay
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
                    store.dispatch("stepTwoToQuestPhase")
                }
            }
        }
    }
</script>

<style>
</style>
