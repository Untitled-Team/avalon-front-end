<template>
    <div id="proposeMissionMenu">
        <div class="mediumText">Mission Leader: {{ missionLeader }}</div>
        <div class="mediumText">Party Size: {{ currentMissionPartySize }}</div>
        <form>
            <div :key="index" v-for="(player, index) in players">
                <label @click="e => e.target.classList.toggle('selected')">
                    <input type="checkbox" :id="player" :value="player" v-model="selectedPlayers"
                           :disabled="!playerIsMissionLeader"/>{{ player }}
                </label>
            </div>
            <input type="button" class="button is-small" v-on:click="proposeParty" value="Propose Party"
                   v-show="playerIsMissionLeader">
        </form>
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'ProposeMissionMenu',
        data: function () {
            return {
                players: store.state.players,
                selectedPlayers: [],
            }
        },
        props: ["missionLeader", "currentMissionPartySize"],
        methods: {
            proposeParty: function () {
                this.$socket.sendObj({
                    event: 'ProposeParty',
                    proposedParty: this.selectedPlayers,
                })
            }
        },
        computed: {
            playerIsMissionLeader: function () {
                return store.state.nickname === this.missionLeader
            },
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
        box-shadow: 3px 3px #3d3c5c;
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