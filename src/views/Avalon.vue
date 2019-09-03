<template>
    <div class="home">
        <Intro v-if="stepOne"/>
        <Lobby v-if="lobbyStep" :players="players"/>
        <PlayerInfo v-if="stepTwo" :good="this.good" :bad="this.bad" :merlin="this.merlin" :assassin="this.assassin" :badGuys="this.badGuys"/>
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
                    good: false,
                    bad: false,
                    merlin: false,
                    assassin: false,
                    badGuys: []
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
            playerInfoStuff: function() {
                return store.getters.getPlayerInfoStuff;
            }
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)
                if (msgJSON.action == 'moveToLobby') {
                    store.dispatch('stepOneToLobbyStep')
                    this.players = msgJSON.nicknames
                } else if (msgJSON.action == 'playerJoinedLobby') {
                    this.players = msgJSON.nicknames
                } else if (msgJSON.action == 'playerInfo') {
                    this.good = msgJSON.good
                    this.bad = msgJSON.bad
                    this.merlin = msgJSON.merlin
                    this.assassin = msgJSON.assassin
                    this.badGuys = msgJSON.badGuys
                    store.dispatch("lobbyStepToStepTwo")
                }
            }
        }
    }
</script>

<style>
</style>
