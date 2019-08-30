<template>
    <div id="intro">
        <h1>Welcome to Avalon!</h1>
        <div id="menu">
            <form>
                <input v-model="nickname" type="text" class="textInput" name="nickname"
                       placeholder="Player Nickname...">
                <input v-model="gameRoomNumber" type="text" class="textInput" name="gameRoomNumber"
                       placeholder="Game Room Number...">
                <label for="numPlayers">Number of Players</label>
                <input v-model="numPlayers" type="number" id="numPlayers" min="5" max="10">
                <label for="merlin">Use Merlin?</label>
                <input v-model="merlin" type="checkbox" name="merlin" id="merlin">
                <label for="assassin">Use Assassin?</label>
                <input v-model="assassin" type="checkbox" name="assassin" id="assassin">
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
                numPlayers: 5,
                merlin: false,
                assassin: false,
            }
        },
        methods: {
            // createGame: function () {
            //     this.$socket.sendObj({
            //         action: 'createGame',
            //         nickname: this.nickname,
            //         numPlayers: this.numPlayers,
            //         merlin: this.merlin,
            //         assassin: this.assassin,
            //     });
            //
            // },
            createGame: function () {
                this.$socket.sendObj({
                    action: 'CreateGame',
                    nickname: this.nickname,
                    config: {
                        merlin: this.merlin,
                        assassin: this.assassin,
                    }
                });
            },
            joinGame: function () {
                this.$socket.sendObj({
                    action: 'join',
                    nickname: this.nickname,
                    gameRoomNumber: this.gameRoomNumber,
                })
            }
        }
    }
</script>

<style scoped>
    #intro {
        margin: 40px 0 0;
        text-align: center;
    }

    #menu {
        margin: auto;
        padding: 15px;
        background: #8B77A7;
        width: 25%;
        display: flex;
        justify-content: center;
    }

    #menu input {
        width: 70%;
        margin: 35px;
        border: 1px solid yellow;
        min-height: 40px;
        position: relative;
        display: inline-block;
    }

    #menu label {
        font-size: .8em;
        display: inline-block;
    }
</style>
