<template>
    <div id="teamVotes">
        <div class="playerInfoModal" v-if="modalActive">
            <div class="votesContainer">
                <div class="votesHeader">
                    <img class="voteImage" src="@/assets/voteUnderlinedBig.png">
                </div>

                <div class="bigText" v-if="approvedExist">
                    <img class="voteImage" src="@/assets/yeaBig.png">
                </div>
                <div class="approval">
                    <div class="approvers" :key="index" v-for="(player, index) in approved">
                        {{ player }}
                    </div>
                </div>

                <div class="bigText" v-if="deniedExist">
                    <img class="voteImage" src="@/assets/nayBig.png">
                </div>
                <div class="denied">

                    <div class="deniers" :key="index" v-for="(player, index) in denied">
                        {{ player }}
                    </div>
                </div>

                <div>
                    <button class="okButton" v-on:click="acknowledge">Ok</button>
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

    .bigText {
        img {
            height: 38px;
            width: auto;
        }
        color: black;
    }

    .okButton {
        font-family: inherit;
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 0;
        border: $successful solid 1px;
        appearance: none;
        padding-right: 23px;
        padding-left: 25px;
        font-size: 2.3em;
        font-weight: bold;
        color: #2f3026;
        background: whitesmoke;
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
        /*height: 60%;*/
        width: 65%;
        background: #e7c29f;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        max-width: 400px;
    }

    .playerInfoModal {
        margin: auto;
        position: absolute;
        background: rgba(black, 0.6);
        top: 0; left: 0; bottom: 0; right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
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
