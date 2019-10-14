<template>
    <div id="lobby" class="container is-paddingless">

        <img src="@/assets/castleBigger.png">
        <img class="title" src="@/assets/titleBig.png">

        <div class="lobbyData">
            <p class="roomId is-size-3-mobile">{{ roomId }} - Lobby</p>
            <h3 id="totalPlayers" class="is-size-4-mobile">Total Players: {{ players.length }}</h3>
            <div class="lobbyPlayer is-size-5-mobile" :key="index" v-for="(player, index) in players">
                {{ player }}
            </div>

            <form id="lobbyReadyForm" @submit.prevent="startGame">
                <input type="submit" class="button is-small" value="Everyone's in!"/>
            </form>

            <div id="warning" class="is-size-6-mobile" v-if="!correctPlayerNumbers">
                Avalon requires between 5 and 10 players.
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

    #lobby {
        background: $water;
        height: 100%;
      color: whitesmoke;
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
        top: -10%;
    }

    .roomId {
      font-size: 1.3em;
    }
</style>
