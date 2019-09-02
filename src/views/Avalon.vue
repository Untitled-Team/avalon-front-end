<template>
    <div class="home">
        <Intro v-if="stepOne"/>
        <PlayerInfo v-if="stepTwo" :good="playerInfoStuff.good" :bad="playerInfoStuff.bad" :merlin="playerInfoStuff.merlin" :assassin="playerInfoStuff.assassin" :badGuys="playerInfoStuff.badGuys"/>
        <QuestInfo v-if="questInfoDisplay"/>
    </div>
</template>

<script>
    import store from "../store/index.js"
    import Intro from "../components/Intro"
    import PlayerInfo from "../components/PlayerInfo"
    import QuestInfo from "../components/QuestInfo";

    export default {
        name: 'home',
        components: {
            QuestInfo,
            PlayerInfo,
            Intro
        },
        computed: {
            stepOne: function() {
                return store.getters.getStepOne
            },
            stepTwo: function() {
                return store.getters.getStepTwo
            },
            questInfoDisplay: function() {
                return store.getters.getQuestInfoDisplay
            },
            playerInfoStuff: function() {
                return store.getters.playerInfoStuff;
            }
        },
    }
</script>

<style>
</style>
