<template>
    <div id="leaveGame">

        <div class="leaveGameWrapper" v-if="modalActive">
            <div class="innerWrapper">
                <div>Are you sure you want to leave?</div>

                <div>You cannot come back to this game.</div>

                <div class="buttonWrapper">
                    <img @click="toggleModalActive" class="stayInGame" src="@/assets/takeMeBackButton.png">
                    <img @click="resetToLobby" class="leaveGameButton" src="@/assets/confirmLeaveButton.png">
                </div>
            </div>
        </div>


        <img v-if="parentComponentIsLobby" src="@/assets/leaveButton.png" @click="toggleModalActive"
             class="lobbyLeave">

        <img v-else src="@/assets/leaveGameButton.png" @click="toggleModalActive" class="leaveGameButtonModal">
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'leaveGame',
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
                if (this.parentComponentIsWinner) {
                    this.resetToLobby()
                }
                this.modalActive = !this.modalActive
            },
        },
        computed: {
            parentComponentIsLobby: function () {
                return this.$parent.$options.name === 'Lobby'
            },
            parentComponentIsWinner: function () {
                return this.$parent.$options.name === 'Winner'
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .lobbyLeave {
        height: $defaultLobbyButtonHeight;
    }

    .leaveGameButtonModal {
        padding-top: 5px;
        margin: auto;
        /*object-fit: contain;*/
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

        .buttonWrapper {
            display: flex;
            justify-content: space-around;
            width: 100%;
            margin-top: 5%;

            .stayInGame {
                width: 45%;
            }

            .leaveGameButton {
                width: 45%;
            }
        }
    }
</style>
