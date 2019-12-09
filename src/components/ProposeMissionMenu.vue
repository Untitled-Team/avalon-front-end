<template>
    <div id="proposeMissionMenu">
        <div class="twoMustFail" v-if="twoMustFail">
            Requires 2+ fail votes
        </div>

        <div class="teamSelection" v-show="playerIsMissionLeader">
            <div class="chooseTeam">Choose a team</div>
            <form class="proposal" @submit.prevent="proposeParty">
                <div :key="index" v-for="(player, index) in players" class="playerDiv"
                     :class="{selected: selectedPlayers.includes(player)}">
                    <label @click="e => addSelectedClass(e)">
                        <p>{{ player }}</p>
                    </label>
                </div>
                <button type="submit" class="proposePartyButton">
                    <img src="@/assets/proposePartyButton.png">
                </button>
            </form>
        </div>

        <div class="notLeader is-size-4-mobile is-size-4-desktop" v-show="!playerIsMissionLeader">
            <p class="choosing">{{ currentMissionLeader }} is choosing a team...</p>
            <div class="swordWrapper">
                <img class="crossedSwords" src="@/assets/crossedSwordsBig.png"/>
            </div>
        </div>

        <div class="proposalsLeft">
            <b class="nextMissionLeaderClass">{{ nextMissionLeader }}</b> is the next leader
        </div>
        <div class="proposalsLeft">
            {{ proposalsLeft }} party proposals remaining
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"

    export default {
        name: 'ProposeMissionMenu',
        data: function () {
            return {
                selectedPlayers: [],
            }
        },
        methods: {
            proposeParty: function () {
                if (this.proposedPartyIsCorrectSize) {
                    let proposePartyMessage = {
                        event: 'ProposeParty',
                        proposedParty: this.selectedPlayers,
                    }
                    WebsocketService.sendObj(this.$socket, proposePartyMessage)
                }
            },
            addSelectedClass: function (event) {
                if (this.playerIsMissionLeader) {
                    var playerChosen = event.target.textContent

                    if (this.selectedPlayers.includes(playerChosen)) {
                        // eslint-disable-next-line no-unused-vars
                        this.selectedPlayers = this.selectedPlayers.filter(function (value, index, arr) {
                            return value !== playerChosen;
                        });
                    } else if (this.selectedPlayers.length < this.currentMissionPartySize) {
                        this.selectedPlayers.push(playerChosen)
                    }
                }
            }
        },
        computed: {
            playerIsMissionLeader: function () {
                return this.$store.state.nickname === this.currentMissionLeader
            },
            proposedPartyIsCorrectSize: function () {
                return this.selectedPlayers.length === this.currentMissionPartySize
            },
            currentMissionLeader: function () {
                return this.$store.state.currentMissionLeader
            },
            currentMissionPartySize: function () {
                return this.$store.state.missions[this.$store.state.currentMission - 1].numberOfAdventurers
            },
            players: function () {
                return this.$store.state.players
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
                return fourthMission && sevenOrMorePlayers
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .nextMissionLeaderClass {
        color: whitesmoke;
    }

    .twoMustFail {
        margin-left: 10px;
        margin-right: 10px;
        font-size: 1.8em;
        color: $bannerOutline;
    }

    .proposePartyButton {
        background-color: inherit;
        margin-top: 5px;
        border: 0;
        max-width: 90%;
        align-self: center;
    }

    .proposalsLeft {
        margin-bottom: 2px;
        font-size: 2.2em;
        align-self: center;
        color: $bannerOutline;
    }

    .button {
        margin-top: 5px;
    }

    .chooseTeam {
        font-size: 2.25em;
        margin-bottom: -5px;
        margin-top: -5px;
    }

    .choosing {
        margin-left: 7px;
        margin-right: 7px;
    }

    #missionLeader {
        margin-bottom: 40px;
    }

    .proposal {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 67%;
    }

    .crossedSwords {
        display: flex;
        flex-direction: column;
    }

    #proposeMissionMenu {
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        font-size: 1.1em;
    }

    .teamSelection {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-grow: 1;
    }

    .notLeader {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .swordWrapper {
            display: flex;
            flex: 1 1 0;
            height: 0;
            width: 65%;
            margin: 0 auto;

            img {
                object-fit: contain;
            }
        }
    }

    .playerDiv {
        width: 100%;
        cursor: pointer;
        font-size: 2em;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        margin-top: 3px;
        padding: 1px;
        max-width: 180px;
        background: rgba(black, 0.11);
    }

    .submission {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    .selected {
        background: rgba(whitesmoke, 0.35);
    }

    input[type=checkbox] {
        display: none;
    }

    .button {
        margin-top: 1em;
    }

    .partySizeWarning {
        font-size: 3em;
    }


    @media (max-height: 1500px) {
        .chooseTeam {
            font-size: 4em;
        }

        .playerDiv {
            font-size: 3.5em;
        }
    }

    @media (max-height: 1000px) {
        .chooseTeam {
            font-size: 4em;
        }

        .proposalsLeft {
            font-size: 2em;
        }

        .playerDiv {
            font-size: 2.75em;
        }
    }

    @media (max-height: 700px) {
        .proposalsLeft {
            font-size: 1.7em;
        }
    }

    @media (max-height: 553px) {
        .proposalsLeft {
            font-size: 1.7em;
        }

        .chooseTeam {
            font-size: 2.75em;
        }

        .playerDiv {
            font-size: 2.5em;
        }
    }

    @media (max-height: 472px) {

        .proposalsLeft {
            font-size: 1.6em;
        }

        .chooseTeam {
            margin-top: 0px;
            font-size: 2.1em;
        }

        .playerDiv {
            max-width: 180px;
            font-size: 1.8em;
        }
    }
</style>
