<template>
    <div id="intro">
        <h1>Welcome to Avalon!</h1>
        <div id="menu">
            <form>
                <input v-model="nickname" type="text" class="textInput" name="nickname" placeholder="Player Nickname...">
                <input v-model="gameRoomNumber" type="text" class="textInput" name="gameRoomNumber" placeholder="Game Room Number...">
                <label for="numPlayers">Number of Players</label>
                <input v-model="numPlayers" type="number" id="numPlayers" min="5" max="10">
                <input v-model="merlin" type="checkbox" name="merlin" value="merlin">Merlin<br>
                <input v-model="assassin" type="checkbox" name="assassin" value="assassin">Assassin<br>
                <input type="button" class="buttonInput" name="joinGame" value="Join Existing Game"
                       v-on:click="joinGame">
                <input type="button" class="buttonInput" name="createGame" value="Create a New Game Room"
                       v-on:click="createGame">
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Intro',
        data: function () {
            return {
                nickname: "",
                gameRoomNumber: "",
                numPlayers: 0,
                merlin: false,
                assassin: false,
            }
        },
        methods: {
            createGame: function() {
                this.$socket.emit('create', {
                    nickname: this.nickname,
                    numPlayers: this.numPlayers,
                    merlin: this.merlin,
                    assassin: this.assassin,
                })},
            joinGame: function() {
                this.$socket.emit('join', {
                    nickname: this.nickname,
                    gameRoomNumber: this.gameRoomNumber
                })
            }
        }
    }
</script>

<style scoped>
    #intro {
        margin: 40px 0 0;
    }

    #menu {
        padding: 15px;
        background: tomato;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #menu input {
        width: 70%;
        display: block;
        margin: 35px;
        flex: 1 1 0;
        border: 1px solid yellow;
        text-align: center;
        min-height: 40px;
        position: relative
    }
</style>
