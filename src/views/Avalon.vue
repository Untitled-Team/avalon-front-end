<template>
    <div class="home">
        <Intro v-if="stepOne"/>
        <PlayerInfo v-if="stepTwo" :good="good" :bad="bad" :merlin="merlin" :assassin="assassin" :badGuys="badGuys"/>
    </div>
</template>

<script>
    import store from "../store/index.js"
    import Intro from "../components/Intro"
    import PlayerInfo from "../components/PlayerInfo"

    export default {
        name: 'home',
        data: function() {
          return {
              good: false,
              bad: false,
              merlin: false,
              assassin: false,
              badGuys: []
          }
        },
        components: {
            PlayerInfo,
            Intro
        },
        sockets: {
            playerInfoMessage: function (playerInfoMessage) {
                this.good = playerInfoMessage.good
                this.bad = playerInfoMessage.bad
                this.merlin = playerInfoMessage.merlin
                this.assassin = playerInfoMessage.assassin
                this.badGuys = playerInfoMessage.badGuys
                store.dispatch("stepOneToStepTwo")
            },
        },
        computed: {
            stepOne: function() {
                return store.getters.getStepOne
            },
            stepTwo: function() {
                return store.getters.getStepTwo
            },
        },
    }
</script>

<style>
</style>
