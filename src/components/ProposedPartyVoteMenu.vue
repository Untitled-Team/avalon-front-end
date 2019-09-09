<template>
    <div id="proposedPartyVoteMenu">
        <div id="vote" v-show="!playersHasVoted">
            Proposed Party
            <br/>
            {{ proposedParty }}
            <br/>
            <input type="button" class="button" v-on:click="voteToApprove" value="Vote To Approve">
            <br/>
            <input type="button" class="button" v-on:click="voteToDeny" value="Vote To Deny">
        </div>
        <div id="WaitingOnOthers" v-show="playersHasVoted">
            Thanks for your vote! The game will proceed once all players have voted to approve or deny!
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProposedPartyVoteMenu',
        props: ["proposedParty"],
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