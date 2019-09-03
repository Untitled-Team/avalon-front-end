<template>
    <div id="lobby">
        <h1>Chill here until everybody is in!</h1>
        <div v-bind:key="player" v-for="player in players">
            {{ player }}
        </div>
        <button v-on:click="startGame">Everyone's in! Ready to start</button>
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'Lobby',
        props: ['players'],
        methods: {
            startGame: function () {
                this.$socket.sendObj({action: 'lobbyReady'});
            }
        },
        computed: {
            lobbyNicknames: function () {
                return store.getters.getLobbyNicknames
            },
        },
    }
</script>

<style scoped>
</style>
