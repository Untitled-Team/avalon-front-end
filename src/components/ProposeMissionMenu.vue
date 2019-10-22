<template>
    <div id="proposeMissionMenu">

        <div class="teamSelection" v-show="playerIsMissionLeader">
            <p class="chooseTeam is-size-3-mobile is-size-3-desktop">Choose a team</p>
            <form class="proposal" @submit.prevent="proposeParty">
                <div :key="index" v-for="(player, index) in players" class="playerDiv" :class="{selected: selectedPlayers.includes(player)}">
                    <label @click="e => addSelectedClass(e)">
                        <p class="is-size-4-mobile is-size-4-desktop">{{ player }}</p>
                    </label>
                </div>
                <input type="submit" class="button is-small submission" value="Propose Party">
            </form>
        </div>

        <div class="notLeader is-size-4-mobile is-size-4-desktop" v-show="!playerIsMissionLeader">
            <p class="choosing">{{ missionLeader }} is choosing a team...</p>
            <img class="crossedSwords" src="@/assets/crossedSwordsBig.png"/>
        </div>

    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"

    export default {
        name: 'ProposeMissionMenu',
        data: function () {
            return {
                players: this.$store.state.players,
                selectedPlayers: [],
            }
        },
        props: ["missionLeader", "currentMissionPartySize"],
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
                        this.selectedPlayers = this.selectedPlayers.filter(function(value, index, arr){
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
                return this.$store.state.nickname === this.missionLeader
            },
            proposedPartyIsCorrectSize: function () {
                return this.selectedPlayers.length === this.currentMissionPartySize
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
        margin-top: 20px;
        margin-bottom: 60px;
    }

    #missionLeader {
        margin-bottom: 40px;
    }

    .proposal {
        margin-bottom: 100px;
    }

    #proposeMissionMenu {
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow : 1;
    }

    .teamSelection {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-grow : 1;
    }

    .notLeader {
        display: flex;
        flex-direction: column;
        flex-grow : 1;
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
</style>
