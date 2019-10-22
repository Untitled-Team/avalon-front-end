<template>
    <div id="proposedPartyVoteMenu">
        <div id="vote" v-show="!playerHasVoted">
            <div class="is-size-4-mobile is-size-4-desktop">{{ missionLeader }}'s team</div>
            <div :key="index" v-for="(player, index) in proposedParty" class="teamMember">
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
            Waiting for others...
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
                const partyApproveMessage = {
                    event: 'PartyApprovalVote',
                    partyPassVote: true,
                }
                WebsocketService.sendObj(this.$socket, partyApproveMessage)
            },
            voteToDeny: function () {
                const partyDenyMessage = {
                    event: 'PartyApprovalVote',
                    partyPassVote: false,
                }
                WebsocketService.sendObj(this.$socket, partyDenyMessage)
            },
        },created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)
                console.log(msgJSON)

                if (msgJSON.event === 'PartyApprovalVoteAcknowledgement') {
                    this.playerHasVoted = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    #proposedPartyVoteMenu {
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow : 1;
        padding-top: 20px;
        color: whitesmoke;
        background: $current;
    }

    .teamMember {
        width: 67%;
        cursor: pointer;
        font-size: 2.5em;
        display: inline-block;
        margin-top: 3px;
        padding: 1px;
        background: rgba(black, 0.11);
    }

    #WaitingOnOthers {
        padding-top: 40px;
        font-size: 3em;
    }

    .someMargin {
        margin: 1em 0px;
    }
</style>