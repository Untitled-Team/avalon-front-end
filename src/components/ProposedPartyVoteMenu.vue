<template>
    <div id="proposedPartyVoteMenu">
        <div id="vote" v-show="!playerHasVoted">
            <div class="bigText">{{ missionLeader }} has proposed the following party for the quest:</div>
            <div :key="index" v-for="(player, index) in proposedParty" class="mediumText">
                {{ player }}
            </div>
            <div class="someMargin">
                <input id="approveButton" type="button" class="button is-small" v-on:click="voteToApprove" value="Approve">
            </div>
            <div class="someMargin">
                <input id="denyButton" type="button" class="button is-small" v-on:click="voteToDeny" value="Deny">
            </div>
        </div>
        <div id="WaitingOnOthers" v-show="playerHasVoted">
            Thanks for your vote! The game will proceed once all players have voted to approve or deny!
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'ProposedPartyVoteMenu',
        props: ["proposedParty", "missionLeader"],
        data: function () {
            return {
                playerHasVoted: false,
            }
        },
        methods: {
            voteToApprove: function () {
                this.playerHasVoted = true
                const partyApproveMessage = {
                    event: 'PartyApprovalVote',
                    partyPassVote: true,
                }
                WebsocketService.sendObj(this.$socket, partyApproveMessage)
            },
            voteToDeny: function () {
                this.playerHasVoted = true
                const partyDenyMessage = {
                    event: 'PartyApprovalVote',
                    partyPassVote: false,
                }
                WebsocketService.sendObj(this.$socket, partyDenyMessage)
            },
        },
    }
</script>

<style scoped>
    #proposedPartyVoteMenu {
        padding: 15px;
    }

    .someMargin {
        margin: 1em 0px;
    }
</style>