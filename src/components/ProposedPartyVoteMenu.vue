<template>
    <div id="proposedPartyVoteMenu">
        <div id="vote" v-show="!playersHasVoted">
            <div class="bigText">{{ missionLeader }} has proposed the following party for the quest:</div>
            <div :key="index" v-for="(player, index) in proposedParty" class="mediumText">
                {{ player }}
            </div>
            <input type="button" class="button is-small" v-on:click="voteToApprove" value="Vote To Approve">
            <input type="button" class="button is-small" v-on:click="voteToDeny" value="Vote To Deny">
        </div>
        <div id="WaitingOnOthers" v-show="playersHasVoted">
            Thanks for your vote! The game will proceed once all players have voted to approve or deny!
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProposedPartyVoteMenu',
        props: ["proposedParty", "missionLeader"],
        data: function() {
            return {
                playersHasVoted: false,
            }
        },
        methods: {
            voteToApprove: function () {
                this.playersHasVoted = true
                this.$socket.sendObj({
                    event: 'PartyApprovalVote',
                    partyPassVote: true,
                })
            },
            voteToDeny: function () {
                this.playersHasVoted = true
                this.$socket.sendObj({
                    event: 'PartyApprovalVote',
                    partyPassVote: false,
                })
            },
        },
    }
</script>

<style scoped>
    #proposedPartyVoteMenu {
        padding: 15px;
    }
</style>