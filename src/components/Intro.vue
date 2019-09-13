<template>
    <div class="intro">
        <div class="columns is-mobile">
            <div class="column is-one-quarter"></div>
            <div class="column is-half">
                <p>Welcome to Avalon!</p>
                <div class="section menu">
                    <div class="container">
                        <div class="field">
                            <input v-model="nickname" type="text" class="textInput" name="nickname"
                                   placeholder="Player Nickname..."/>
                        </div>
                        <div class="field">
                            <input v-model="roomId" type="text" class="textInput" name="roomId"
                                   placeholder="Room ID..."/>
                        </div>
                        <div class="field">
                            <input type="button" class="buttonInput button is-small" name="joinGame" value="Join Existing Game"
                                   v-on:click="joinGame"/>
                        </div>
                    </div>
                </div>
                <br>
                <div class="section menu">
                    <div class="container">
                        <div class="field">
                            <input v-model="nickname" type="text" class="textInput" name="nickname"
                                   placeholder="Player Nickname..."/>
                        </div>
                        <div class="field">
                            <input type="button" class="buttonInput button is-small" name="createGame"
                                   value="Create a New Game"
                                   v-on:click="createGame"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter"></div>
        </div>
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: "Intro",
        data: function () {
            return {
                nickname: "",
                roomId: ""
            }
        },
        methods: {
            createGame: function () {
                store.commit("setNickname", this.nickname);
                this.$socket.sendObj({
                    event: "CreateGame",
                    nickname: this.nickname
                })
            },
            joinGame: function () {
                store.commit("setNickname", this.nickname);
                this.$socket.sendObj({
                    event: "JoinGame",
                    nickname: this.nickname,
                    roomId: this.roomId
                })
            }
        }
    };
</script>

<style scoped>
    .menu {
        background: #8b77a7;
        padding: 1em;
    }

    .field {
        padding: 1em;
    }

    p {
        font-size: 4em;
    }
</style>
