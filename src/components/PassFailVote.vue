<template>
    <div id="passFailVote">
        The players on the mission are:
        <br/>
        {{ missionParty }}
        <br/>
        <div id="vote" v-show="!playersHasVoted && playerVoting">
            <input type="button" class="button" v-on:click="voteToPass" value="Vote To Pass Quest">
            <br/>
            <input type="button" class="button" v-on:click="voteToFail" value="Vote To Fail Quest">
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
                    action: 'PassVote',
                })
            },
            voteToFail: function () {
                this.playersHasVoted = true
                this.$socket.sendObj({
                    action: 'FailVote',
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
</style>