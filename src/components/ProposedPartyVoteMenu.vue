<template>
    <div id="proposedPartyVoteMenu">
        <div id="vote" v-show="!playerHasVoted">
            <div class="is-size-4-mobile is-size-4-desktop">{{ currentMissionLeader }}'s team</div>
            <div :key="index" v-for="(player, index) in proposedParty" class="teamMember">
                {{ player }}
            </div>
            <div class="someMargin">
                <img src="@/assets/approveButton.png" @click="voteToApprove" id="approveButton">
            </div>
            <div class="someMargin">
                <img src="@/assets/denyButton.png" @click="voteToDeny" id="denyButton">
            </div>
        </div>
        <div id="WaitingOnOthers" v-show="playerHasVoted">
            Waiting for others...
        </div>

        <div class="proposalsLeft">
            {{ proposalsLeft-1 }} party proposals remaining
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'ProposedPartyVoteMenu',
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
        },
        computed: {
            currentMissionLeader: function () {
                return this.$store.state.currentMissionLeader
            },
            proposedParty: function () {
                return this.$store.state.ProposedPartyVoteMenu.proposedParty
            },
            playerHasVoted: function () {
                return this.$store.state.ProposedPartyVoteMenu.playerHasVoted
            },
            proposalsLeft: function () {
                return this.$store.state.ProposeMissionMenu.proposalsLeft
            }
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)

                if (msgJSON.event === 'PartyApprovalVoteAcknowledgement') {
                    this.$store.state.ProposedPartyVoteMenu.playerHasVoted = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .proposalsLeft {
        display: flex;
        flex: 1 1 0;
        font-size: 2em;
        align-self: center;
    }

    #proposedPartyVoteMenu {
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding-top: 20px;
        color: whitesmoke;
        background: $current;
    }

    .vote {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .teamMember {
        display: flex;
        flex-direction: column;
        width: 67%;
        cursor: pointer;
        font-size: 2.5em;
        margin: 0 auto;
        margin-top: 3px;
        padding: 1px;
        background: rgba(black, 0.11);
    }

    #WaitingOnOthers {
        padding-top: 40px;
        font-size: 3em;
    }

    .someMargin {
        margin: 1em 0;
    }

    #approveButton {
        margin-top: 5%;
        width: 45%;
    }

    #denyButton {
        width: 33%;
    }
</style>