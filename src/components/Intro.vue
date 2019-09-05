<template>
    <div id="intro">
        <h1>Welcome to Avalon!</h1>
        <div class="menu">
            <form>
                <input v-model="nickname" type="text" class="textInput" name="nickname"
                       placeholder="Player Nickname...">
                <input v-model="roomId" type="text" class="textInput" name="roomId"
                       placeholder="Room ID...">
                <input type="button" class="buttonInput button" name="joinGame" value="Join Existing Game"
                       v-on:click="joinGame">
            </form>
        </div>
        <br>
        <div class="menu">
            <form>
                <input v-model="nickname" type="text" class="textInput" name="nickname"
                       placeholder="Player Nickname...">
                <input type="button" class="buttonInput button" name="createGame" value="Create a New Game Room"
                       v-on:click="createGame">
            </form>
        </div>
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'Intro',
        data: function () {
            return {
                nickname: "",
                roomId: "",
            }
        },
        methods: {
            createGame: function () {
                store.commit('setNickname', this.nickname)
                this.$socket.sendObj({
                    action: 'CreateGame',
                    nickname: this.nickname,
                });
            },
            joinGame: function () {
                store.commit('setNickname', this.nickname)
                this.$socket.sendObj({
                    action: 'JoinGame',
                    nickname: this.nickname,
                    roomId: this.roomId,
                })
            }
        }
    }
</script>

<style scoped>
    #intro {
        margin: 40px 0 0;
    }

    .menu {
        margin: auto;
        padding: 15px;
        background: #8B77A7;
        width: 65%;
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
