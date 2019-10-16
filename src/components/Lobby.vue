<template>
    <div id="lobby">
        <img src="@/assets/castleBigger.png">
        <img class="title" src="@/assets/titleBig.png">

        <div class="lobbyData">
            <div>
                <p class="is-size-4-mobile">Waiting for players...</p>
                <p class="roomId is-size-5-mobile">Access code: {{ roomId }}</p>
            </div>
            <div class="players">
                <div class="lobbyPlayer is-size-5-mobile is-size-6-desktop" :key="index" v-for="(player, index) in players">
                    {{ player }}
                </div>
            </div>

            <form id="lobbyReadyForm" @submit.prevent="startGame" v-show="correctPlayerNumbers">
                <input type="submit" class="startButton button is-small" value="Begin"/>
            </form>

            <div id="warning" class="gameRequirement is-size-6-mobile" v-if="!correctPlayerNumbers">
                5 - 10 players required
            </div>
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'Lobby',
        props: ['players', 'roomId'],
        computed: {
            correctPlayerNumbers: function () {
                return this.players.length >= 5 && this.players.length <= 10
            }
        },
        methods: {
            startGame: function () {
                if (this.correctPlayerNumbers) {
                    const StartGameMessage = {event: 'StartGame'};
                    WebsocketService.sendObj(this.$socket, StartGameMessage);
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .gameRequirement {
        margin-top: 5px;
    }

    .players {
        /*border-right: whitesmoke solid 4px;*/
        padding-top: 5px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        flex-grow : 1;
        width: 58%;
    }

    .lobbyPlayer {
        padding-top: 1px;
        padding-bottom: 1px;
        margin-top: 3px;
        background: rgba(black, 0.1);
    }

    #lobby {
        background: $water;
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow : 1;
    }

    input[type=submit] {
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
        background: $successful;
        color: whitesmoke;
        /*font-size: 50px;*/
    }

    .field {
        padding: 3px;
    }

    .bigText {
        font-size: 4em;
    }

    .title {
        position: absolute;
        top: 7%;
        width: 60%;
        left: 20%;
        right: 20%;
    }

    .bold {
        font-weight: bold;
    }

    .lobbyData {
        flex-direction: column;
        display: flex;
        /*top: -10%;*/
    }

    .roomId {
      font-size: 1.3em;
    }
</style>
