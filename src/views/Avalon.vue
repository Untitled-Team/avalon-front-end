<template>
    <div class="home">
        <Intro v-if="stepOne"/>
        <PlayerInfo v-if="stepTwo" :good="good" :bad="bad" :merlin="merlin" :assassin="assassin" :badGuys="badGuys"/>
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
            QuestInfo,
            PlayerInfo,
            Intro
        },
        actions: {
            playerInfoMessage: function (playerInfoMessage) {
                this.good = playerInfoMessage.good
                this.bad = playerInfoMessage.bad
                this.merlin = playerInfoMessage.merlin
                this.assassin = playerInfoMessage.assassin
                this.badGuys = playerInfoMessage.badGuys
                store.dispatch("stepOneToStepTwo")
            },
            allPlayersReadyMessage: function (allPlayersReadyMessage) {
                this.missionLeader = allPlayersReadyMessage.missionLeader
                store.dispatch("stepTwoToQuestPhase")
            }
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
        },
    }
</script>

<style>
</style>
