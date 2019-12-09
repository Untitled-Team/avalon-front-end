<template>
    <div id="passFailVote">
        <div class="questingMessage">
            <div class="twoMustFail" v-if="twoMustFail">
                Requires 2+ fail votes
            </div>

            <span :key="index" v-for="(player, index) in missionParty">
                <span v-if="index == missionParty.length-1"> and </span>{{player}}<span
                    v-if="!(index == missionParty.length-1 || index == missionParty.length-2)">, </span>
            </span> are questing
        </div>

        <div class="swordWrapper">
            <img class="crossedSwords" src="@/assets/crossedSwordsBig.png"/>
        </div>

        <div v-show="!playerHasVoted && playerVoting" class="theButtons">
            <img class="passButton" src="@/assets/passButtonBig.png" v-on:click="voteToPass"/>
            <img class="failButton" src="@/assets/failButtonBig.png" v-on:click="voteToFail"/>
        </div>

        <div id="WaitingOnOthers" v-show="playerHasVoted || !playerVoting">
            Waiting on others...
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"

    export default {
        name: 'PassFailVote',
        methods: {
            voteToPass: function () {
                let QuestVotePassObj = {
                    event: 'QuestVote',
                    questPassVote: true,
                };
                WebsocketService.sendObj(this.$socket, QuestVotePassObj)
            },
            voteToFail: function () {
                let QuestVoteFailObj = {
                    event: 'QuestVote',
                    questPassVote: false,
                };
                WebsocketService.sendObj(this.$socket, QuestVoteFailObj)
            },
        },
        computed: {
            playerVoting: function () {
                return this.missionParty.includes(this.$store.state.nickname)
            },
            missionParty: function () {
                return this.$store.state.ProposedPartyVoteMenu.proposedParty
            },
            playerHasVoted: function () {
                return this.$store.state.PassFailVote.playerHasVoted
            },
            twoMustFail: function () {
                let fourthMission = this.$store.state.currentMission === 4
                let sevenOrMorePlayers = this.$store.state.players.length >= 7
                return fourthMission && sevenOrMorePlayers
            }
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)

                if (msgJSON.event === 'QuestVoteAcknowledgement') {
                    this.$store.state.PassFailVote.playerHasVoted = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .twoMustFail {
        font-size: 1.25rem;
        color: $bannerOutline;
    }

    .questingMessage {
        margin-left: 7px;
        margin-right: 7px;
        font-size: 1.5rem;
    }

    #passFailVote {
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        color: whitesmoke;
    }

    .swordWrapper {
        display: flex;
        flex: 10 1 0;
        margin: 0 auto;
        width: 65%;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .crossedSwords {
        object-fit: contain;
    }


    .theButtons {
        margin: 0 auto;
        padding-bottom: 10px;
    }

    .passButton {
        max-width: 35%;
        margin-right: 10%;
        cursor: pointer;
    }

    .failButton {
        width: 35%;
        cursor: pointer;
    }

    #WaitingOnOthers {
        font-size: 1.2rem;
        margin-bottom: 5px;
    }

    @media (max-height: 472px) {
        .questingMessage {
            font-size: 1.25rem;
        }

        .twoMustFail {
            font-size: 1rem;
        }

        #WaitingOnOthers {
            font-size: 1rem;
            margin-bottom: 5px;
        }
    }
</style>