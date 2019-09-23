<template>
    <div id="proposeMissionMenu">
        <div id="missionLeader" class="bigText">Mission Leader: {{ missionLeader }}</div>
        <div id="partySize" class="mediumText">Party Size: {{ currentMissionPartySize }}</div>
        <form @submit.prevent="proposeParty">
            <div :key="index" v-for="(player, index) in players">
                <label @click="e => addSelectedClass(e)">
                    <input type="checkbox" :id="player" :value="player" v-model="selectedPlayers"/>
                    {{ player }}
                </label>
            </div>
            <input type="submit" class="button is-small" value="Propose Party" v-show="playerIsMissionLeader">
            <div id="partySizeWarning" v-show="!proposedPartyIsCorrectSize && playerIsMissionLeader">
                Please submit exactly {{ currentMissionPartySize }} players for the quest.
            </div>
        </form>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

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
                    event.target.classList.toggle('selected')
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


<style scoped>
    label {
        width: 20rem;
        cursor: pointer;
        font-size: 1.5em;
        display: inline-block;
        margin: auto .2em;
        border: .5px ridge #3d3c5c;
        border-radius: 12px;
        /* box-shadow: 3px 3px #3d3c5c; */
    }

    .selected {
        background: #b0912a;
    }

    #proposeMissionMenu {
        padding: 0px 10px 10px 10px;
        margin: 0px 10px 10px 10px;
    }

    div {
        padding: 7px;
    }

    input[type=checkbox] {
        display: none;
    }

    .button {
        margin-top: 1em;
    }
</style>
