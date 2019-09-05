<template>
    <div id="proposeMissionMenu">
        <div>Mission Leader: {{ missionLeader }}</div>
        <div>party size: {{ currentMissionPartySize }}</div>
        <form>
            <div :key="player" v-for="player in players">
                <input type="checkbox" :value="player" v-model="selectedPlayers" :disabled="!playerIsMissionLeader"/>
                {{ player }}
            </div>
            <input type="button" class="button" v-on:click="proposeParty" value="Propose Party">
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
                    action: 'ProposeParty',
                    proposedParty: this.selectedPlayers,
                })
            }
        },
        computed: {
            playerIsMissionLeader: function () {
                return store.state.nickname === this.missionLeader
            }
        }
    }

</script>


<style scoped>
    #proposeMissionMenu {
        padding: 10px;
        margin: 10px;
    }

    div {
        padding: 7px;
    }
</style>