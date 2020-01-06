<template>
    <div id="teamVotes">
        <div class="playerInfoModal" v-if="modalActive">
            <div class="scrollContainer">
                <div class="scrollTop">
                    <img class="leftHandScroll" src="@/assets/scrollEdgeBig.png">
                    <div class="scrollyPart"></div>
                    <img class="rightHandScroll" src="@/assets/scrollEdgeBig.png">
                </div>
                <div class="votesContainer">
                    <div class="votesHeader">
                        <img class="voteImage" src="@/assets/voteUnderlinedBig.png">
                    </div>

                    <div class="bigText" v-if="approvedExist">
                        <img class="voteImage" src="@/assets/yeaBig.png">
                    </div>
                    <div class="approval" v-if="approvedExist">
                        <div class="approvers" :key="index" v-for="(player, index) in approved">
                            {{ player }}
                        </div>
                    </div>
                    <div class="bigText" v-if="deniedExist">
                        <img class="voteImage" src="@/assets/nayBig.png">
                    </div>
                    <div class="denied" v-if="deniedExist">
                        <div class="deniers" :key="index" v-for="(player, index) in denied">
                            {{ player }}
                        </div>
                    </div>

                    <img @click="acknowledge" class="okButton" src="@/assets/okButton.png">
                </div>
                <div class="scrollTop">
                    <img class="leftHandScroll" src="@/assets/scrollEdgeBig.png">
                    <div class="scrollyPartBottom"></div>
                    <img class="rightHandScroll" src="@/assets/scrollEdgeBig.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TeamVotes',
        computed: {
            modalActive: function () {
                return this.$store.state.gameState.teamVotesDisplay
            },
            approved: function () {
                return this.$store.state.TeamVotesData.approved
            },
            denied: function () {
                return this.$store.state.TeamVotesData.denied
            },
            deniedExist: function () {
                return this.$store.state.TeamVotesData.denied.length !== 0
            },
            approvedExist: function () {
                return this.$store.state.TeamVotesData.approved.length !== 0
            },
            missionLeader: function () {
                return this.$store.state.TeamVotesData.missionLeader
            }
        },
        methods: {
            acknowledge: function () {
                this.$store.state.gameState.teamVotesDisplay = false
                this.$store.state.TeamVotesData.approved = []
                this.$store.state.TeamVotesData.denied = []
                this.$store.state.TeamVotesData.missionLeader = ""
                return
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .rightHandScroll {
        transform: rotate(180deg);
    }

    .scrollContainer {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

    }

    .scrollTop {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
        justify-content: center;

        img {
            height: 40px;
            width: auto;
        }
    }

    .scrollyPartBottom {
        height: 40px;
        max-width: 400px;
        width: 65%;
        background: url(../assets/scrollRepeatBottomBig.png) repeat-x center center;
        background-color: #e7c29f;
        background-size: auto 100%;
    }

    .scrollyPart {
        height: 40px;
        max-width: 400px;
        width: 65%;
        background: url(../assets/scrollRepeatBig.png) repeat-x center center;
        background-size: auto 100%;
    }

    .testContainer {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        align-items: center;
        height: 40px;
        justify-content: center;

        img {
            display: flex;
        }
    }

    .bigText {
        img {
            height: 38px;
            width: auto;
        }

        color: black;
    }

    .okButton {
        display: flex;
        align-self: center;
        width: 40%;
        margin-top: 10px;
        margin-bottom: 5px;
    }

    .approval {
        width: 80%;
        margin: 0 auto;
        margin-top: 4px;
        font-size: 2.2em;
        color: #4d9276;
        margin-bottom: 6%;
    }

    .denied {
        width: 80%;
        margin: 0 auto;
        font-size: 2.2em;
        color: $failed;
    }

    .votesHeader {
        font-size: 3.5em;
        display: flex;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 5%;

        img {
            object-fit: contain;
        }
    }

    .votesContainer {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        color: whitesmoke;
        width: 65%;
        background: #e7c29f;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        max-width: 400px;

        box-shadow: -5px 0 0 0 black, 5px 0 0 0 black;
    }

    .playerInfoModal {
        margin: auto;
        position: absolute;
        background: rgba(black, 0.3);
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        z-index: 999;
    }

    @media (max-height: 1500px) {
    }

    @media (max-height: 1000px) {
    }

    @media (max-height: 700px) {
        .bigText {
            img {
                height: 24px;
            }
        }

        .approval {
            font-size: 2.4em;
        }

        .denied {
            font-size: 2.4em;
        }

        .votesHeader {
            img {
                height: 100px;
            }
        }
    }

    @media (max-height: 553px) {
        .bigText {
            img {
                height: 20px;
            }
        }

        .votesHeader {
            img {
                height: 90px;
            }
        }
    }

    @media (max-height: 472px) {
        .bigText {
            img {
                height: 15px;
            }
        }

        .approval {
            font-size: 2em;
        }

        .denied {
            font-size: 2em;
        }

        .votesHeader {
            img {
                height: 80px;
            }
        }
    }
</style>
