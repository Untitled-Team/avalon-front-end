<template>
    <div id="teamVotes">
        <div class="playerInfoModal" v-if="modalActive">
            <div class="votesContainer">
                <div class="votesHeader">
                    {{ missionLeader }}'s Team Proposal
                </div>

                <div class="approval">
                    <div>Approve</div>
                    <div class="approvers" :key="index" v-for="(player, index) in approved">
                        {{ player }}
                    </div>
                </div>

                <div class="denied">
                    <div>Deny</div>
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
        font-size: 2.2em;
        background-color: $successful;
        margin-bottom: 5px;
    }

    .denied {
        width: 80%;
        margin: 0 auto;
        font-size: 2.2em;
        background-color: $failed;
    }

    .approvers {

    }

    .votesHeader {
        font-size: 3.5em;
        display: flex;
        margin: 0 auto;
        margin-top: 10px;
    }

    .votesContainer {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        color: whitesmoke;
        width: 60%;
        background: #2f3026;
        border: 6px solid $insideBorder;
    }

    .playerInfoModal {
        margin: auto;
        position: absolute;
        background: rgba(black, 0.6);
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>
