<template>
    <div class="intro">
        <div class="columns is-mobile">
            <div class="column is-full">
                <div class="bigText">Welcome to Avalon!</div>
                <div class="section menu">
                    <div class="container">
                        <form @submit.prevent="joinGame">
                            <div class="field">
                                <input v-model="nickname" type="text" placeholder="Player Nickname..." required/>
                            </div>
                            <div class="field">
                                <input v-model="roomId" type="text" placeholder="Room ID..." required/>
                            </div>
                            <div class="field">
                                <input type="submit" class="buttonInput button is-small" value="Join Existing Game"/>
                            </div>
                        </form>
                    </div>
                </div>
                <br>
                <div class="section menu">
                    <div class="container">
                        <form @submit.prevent="createGame">
                            <div class="field">
                                    <input v-model="nickname" type="text" placeholder="Player Nickname..." required/>
                            </div>
                            <div class="field">
                                <input type="submit" class="buttonInput button is-small" name="createGame"
                                       value="Create a New Game"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
            },
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

    .bigText {
        font-size: 4em;
    }
</style>
