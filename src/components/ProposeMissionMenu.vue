<template>
    <div id="proposeMissionMenu">

        <div class="teamSelection" v-show="playerIsMissionLeader">
            <p class="chooseTeam is-size-3-mobile is-size-3-desktop">Choose a team</p>
            <form class="proposal" @submit.prevent="proposeParty">
                <div :key="index" v-for="(player, index) in players" class="playerDiv"
                     :class="{selected: selectedPlayers.includes(player)}">
                    <label @click="e => addSelectedClass(e)">
                        <p class="is-size-4-mobile is-size-4-desktop">{{ player }}</p>
                    </label>
                </div>
                <input type="submit" class="button is-small submission" value="Propose Party">
            </form>

            <div class="partySizeWarning">
                <div :style="{visibility: !proposedPartyIsCorrectSize ? 'visible' : 'hidden'}">
                    Choose {{currentMissionPartySize}} players
                </div>
            </div>
        </div>

        <div class="notLeader is-size-4-mobile is-size-4-desktop" v-show="!playerIsMissionLeader">
            <p class="choosing">{{ currentMissionLeader }} is choosing a team...</p>
            <div class="swordWrapper">
                <img class="crossedSwords" src="@/assets/crossedSwordsBig.png"/>
            </div>
        </div>

    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"
    import store from "../store/index.js"

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
                return store.state.nickname === this.currentMissionLeader
            },
            proposedPartyIsCorrectSize: function () {
                return this.selectedPlayers.length === this.currentMissionPartySize
            },
            currentMissionLeader: function () {
                return store.state.currentMissionLeader
            },
            currentMissionPartySize: function () {
                return store.state.missions[store.state.currentMission - 1].numberOfAdventurers
            },
            players: function () {
                return store.state.players
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .chooseTeam {
        margin-bottom: 15px;
    }

    .choosing {
        margin-left: 7px;
        margin-right: 7px;
        margin-top: 7px;
    }

    #missionLeader {
        margin-bottom: 40px;
    }

    .proposal {
        margin-bottom: 25px;
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
        width: 67%;
        cursor: pointer;
        font-size: 1.5em;
        display: inline-block;
        margin-top: 3px;
        padding: 1px;
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
</style>
