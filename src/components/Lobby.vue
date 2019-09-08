<template>
    <div id="lobby">
        <h1>Begin the game once everyone is in the lobby</h1>
        <h2>Once the game has begun new players cannot join</h2>
        <p>Room Number: {{ roomId }}</p>
        <p>Total Players: {{ players.length }}</p>
        <div class="lobbyPlayer" v-bind:key="player" v-for="player in players">
            {{ player }}
        </div>
        <button class="button" v-on:click="startGame">Everyone's in! Ready to start</button>
    </div>
</template>

<script>
    export default {
        name: 'Lobby',
        props: ['players', 'roomId'],
        methods: {
            startGame: function () {
                this.$socket.sendObj({event: 'StartGame'});
            }
        },
    }
</script>

<style scoped>
    #lobby {
        background: #7f8a69;
        width: 60%;
        margin: auto;
        padding: 30px;
    }

    .lobbyPlayer {
        padding: 15px;
        font-size: 1.5em;
    }

    p {
        font-size: 2em;
    }
</style>
