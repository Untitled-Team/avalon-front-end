<template>
    <div id="passFailVote">
        <div class="bigText">
            The players on the mission are
            <span :key="index" v-for="(player, index) in missionParty">
                <span v-if="index == missionParty.length-1"> and </span>{{player}}<span
                    v-if="!(index == missionParty.length-1 || index == missionParty.length-2)">, </span>
            </span>.
        </div>

        <div id="vote" v-show="!playerHasVoted && playerVoting">
            <div class="someMargin">
                <button id="passButton" class="button is-small someMargin" v-on:click="voteToPass">
                    Pass Quest
                </button>
            </div>
            <div class="someMargin">
                <button id="failButton" class="button is-small someMargin" v-on:click="voteToFail">
                    Fail Quest
                </button>
            </div>
        </div>

        <div id="WaitingOnOthers" v-show="playerHasVoted || !playerVoting">
            The game will continue once all players in the mission have voted.
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"

    export default {
        name: 'PassFailVote',
        props: ["missionParty"],
        data: function () {
            return {
                playerHasVoted: false,
            }
        },
        methods: {
            voteToPass: function () {
                this.playerHasVoted = true
                let QuestVotePassObj = {
                    event: 'QuestVote',
                    questPassVote: true,
                };
                WebsocketService.sendObj(this.$socket, QuestVotePassObj)
            },
            voteToFail: function () {
                this.playerHasVoted = true
                let QuestVoteFailObj = {
                    event: 'QuestVote',
                    questPassVote: false,
                };
                WebsocketService.sendObj(this.$socket, QuestVoteFailObj)
            },
        },
        computed: {
            playerVoting: function () {
                return this.missionParty.includes(this.$store.getters.getNickname)
            }
        },
    }
</script>

<style scoped>
    .someMargin {
        margin: .5em 0px;
    }
</style>