<template>
    <div id="passFailVote">
        <div class="bigText">
            The players on the mission are
            <span :key="index" v-for="(player, index) in missionParty">
                <span v-if="index == missionParty.length-1"> and </span>{{player}}<span
                    v-if="!(index == missionParty.length-1 || index == missionParty.length-2)">, </span>
            </span>.
        </div>

        <div id="vote" v-show="!playersHasVoted && playerVoting">
            <div class="someMargin">
                <button class="button is-small someMargin" v-on:click="voteToPass">
                    Pass Quest
                </button>
            </div>
            <div class="someMargin">
                <button class="button is-small someMargin" v-on:click="voteToFail">
                    Fail Quest
                </button>
            </div>
        </div>

        <div id="WaitingOnOthers" v-show="playersHasVoted || !playerVoting">
            The game will continue once all players in the mission have voted.
        </div>
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'PassFailVote',
        props: ["missionParty"],
        data: function () {
            return {
                playersHasVoted: false,
            }
        },
        methods: {
            voteToPass: function () {
                this.playersHasVoted = true
                this.$socket.sendObj({
                    event: 'QuestVote',
                    questPassVote: true,
                })
            },
            voteToFail: function () {
                this.playersHasVoted = true
                this.$socket.sendObj({
                    event: 'QuestVote',
                    questPassVote: false,
                })
            },
        },
        computed: {
            playerVoting: function () {
                return this.missionParty.includes(store.getters.getNickname)
            }
        },
    }
</script>

<style scoped>
    .someMargin {
        margin: .5em 0px;
    }
</style>