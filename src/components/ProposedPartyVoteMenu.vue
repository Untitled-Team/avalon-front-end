<template>
    <div id="proposedPartyVoteMenu">
        <div class="twoMustFail" v-if="twoMustFail">
            Requires 2+ fail votes
        </div>

        <div id="vote" v-show="!playerHasVoted">
            <div class="playersContainer">
                <div class="playersTeam">{{ currentMissionLeader }}'s team</div>
                <div :key="index" v-for="(player, index) in proposedParty" class="teamMember">
                    {{ player }}
                </div>
            </div>

            <div class="proposalsLeft">
                <b class="nextMissionLeaderClass">{{ nextMissionLeader }}</b> is the next leader
            </div>
            <div class="proposalsLeft">
                {{ proposalsLeft-1 }} party proposals remaining
            </div>

            <div class="buttonContainer">
                <button class="someMargin">
                    <img src="@/assets/approveButton.png" @click="voteToApprove" id="approveButton">
                </button>
                <button class="someMargin">
                    <img src="@/assets/denyButton.png" @click="voteToDeny" id="denyButton">
                </button>
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
            },
            nextMissionLeader: function () {
                return this.$store.state.nextMissionLeader
            },
            twoMustFail: function () {
                let fourthMission = this.$store.state.currentMission === 4
                let sevenOrMorePlayers = this.$store.state.players.length >= 7
                let playerVoted = this.$store.state.ProposedPartyVoteMenu.playerHasVoted;
                return fourthMission && sevenOrMorePlayers && !playerVoted
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

    .playersContainer {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        justify-content: center;
    }

    .buttonContainer {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
        margin-bottom: 10px;
    }

    .nextMissionLeaderClass {
        color: whitesmoke;
    }

    .twoMustFail {
        font-size: 2.2em;
        margin-left: 10px;
        margin-right: 10px;
        color: $bannerOutline;
    }

    .proposalsLeft {
        margin: 0 auto;
        margin-top: 3px;
        margin-left: 2%;
        margin-right: 2%;
        font-size: 2em;
        align-self: center;
        color: $bannerOutline;
    }

    #proposedPartyVoteMenu {
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        color: whitesmoke;
        background: $current;
    }

    #vote {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        font-size: .6rem;
    }

    .teamMember {
        display: flex;
        flex-direction: column;
        width: 59%;
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
        background-color: inherit;
        border: 0;
        max-width: 90%;
        align-self: center;
    }

    #approveButton {
        margin-top: 5%;
        height: 40px;
    }

    #denyButton {
        height: 40px;
        margin-top: 5%;
    }

    .playersTeam {
        font-size: 1.5rem;
    }

    @media (max-height: 1500px) {
    }

    @media (max-height: 1000px) {
        .playersTeam {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 1.75rem;
        }
    }

    @media (max-height: 700px) {
        .playersTeam {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 1.6rem;
        }
    }

    @media (max-height: 553px) {
    }

    @media (max-height: 472px) {

        .playersTeam {
            margin-top: 0px;
            margin-bottom: 0px;
            font-size: 1.5rem;
        }

        .proposalsLeft {
            font-size: 2em;
        }

        #vote {
            font-size: .5rem;
        }

        #approveButton {
            height: 35px;
        }

        #denyButton {
            height: 35px;
        }
    }
</style>