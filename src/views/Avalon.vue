<template>
    <div class="home">
        <Intro v-if="stepOne"/>
        <PlayerInfo v-if="stepTwo" :good="true" :bad="false" :merlin="false" :assassin="false"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from "../store/index.js"
    import Intro from "../components/Intro"
    import PlayerInfo from "../components/PlayerInfo"

    export default {
        name: 'home',
        components: {
            PlayerInfo,
            Intro
        },
        sockets: {
            playerInfoMessage: function (playerInfoMessage) {
                console.log(playerInfoMessage)
                store.dispatch("stepOneToStepTwo")
                let PlayerInfoClass = Vue.extend(PlayerInfo)
                let instance = new PlayerInfoClass()
                instance.$mount()

            },
        },
        computed: {
            stepOne: function() {
                return store.getters.getStepOne
            },
            stepTwo: function() {
                return store.getters.getStepTwo
            }
        },
    }
</script>

<style>
</style>
