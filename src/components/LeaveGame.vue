<template>
    <div id="leaveGame">

        <div class="leaveGameWrapper" v-if="modalActive">
            <div class="innerWrapper">
                <div>Are you sure you want to leave?</div>

                <div>You cannot come back to this game.</div>

                <button @click="toggleModalActive" class="stayInGame">Take me back!</button>
                <button @click="resetToLobby" class="leaveGameButton">I'm sure</button>
            </div>
        </div>


        <img v-if="parentComponentIsLobby" src="@/assets/leaveButton.png" @click="toggleModalActive"
             class="leaveGameButtonModal">
        <img v-else src="@/assets/leaveGameButton.png" @click="toggleModalActive" class="leaveGameButtonModal">
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'leaveGame',
        props: ["parent"],
        data: function () {
            return {
                modalActive: false,
            }
        },
        methods: {
            resetToLobby: function () {
                if (this.$store.state.gameState.lobby) {
                    WebsocketService.sendObj(this.$socket, {"event": "LeaveGame"})
                }
                this.$store.commit("resetState");
            },
            toggleModalActive: function () {
                this.modalActive = !this.modalActive
            },
        },
        computed: {
            parentComponentIsLobby: function () {
                return this.parent === "Lobby"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .leaveGameButtonModal {
        padding-top: 5px;
        margin: auto;
    }

    .leaveGameWrapper {
        position: fixed;
        background-color: rgba(10, 10, 10, 1);
        color: antiquewhite;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .innerWrapper {
        margin: 0 auto;
        width: 90%;
        font-size: 2em;
    }

    .stayInGame {
        color: $successful;
        font-size: 25px;
        margin: 5% 3%;
        -webkit-tap-highlight-color: transparent;
    }

    .leaveGameButton {
        color: red;
        font-size: 25px;
        margin: 5% 3%;
        -webkit-tap-highlight-color: transparent;
    }
</style>