<template>
    <div id="lobby">
        <div class="section">
            <div class="somePadding"><h1>Begin the game once everyone is in the lobby</h1></div>
            <div class="somePadding"><h2>Once the game has begun new players cannot join</h2></div>
            <div class="somePadding"><h3>Room Number: {{ roomId }}</h3></div>
            <div class="somePadding"><h3>Total Players: {{ players.length }}</h3></div>
            <div class="lobbyPlayer somePadding" :key="index" v-for="(player, index) in players">
                {{ player }}
            </div>
            <button class="button is-small" v-on:click="startGame">Everyone's in!</button>
        </div>
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
        background-color: #189371;
    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1.75em;
    }

    h3 {
        font-size: 1.5em;
    }

    .somePadding {
        padding: 1.3em;
    }
</style>
