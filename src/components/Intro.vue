<template>
    <div class="intro">
        <div class="columns is-mobile">
            <div class="column is-full">
                <div class="bigText">Welcome to Avalon!</div>
                <div class="section menu">
                    <div class="container">
                        <form id="joinGameForm" @submit.prevent="joinGame">
                            <div class="field">
                                <input id="joinGameNickname" v-model="nickname" type="text"
                                       placeholder="Player Nickname..." required/>
                            </div>
                            <div class="field">
                                <input id="joinGameRoomId" v-model="roomId" type="text" placeholder="Room ID..."
                                       required/>
                            </div>
                            <div class="field">
                                <input id="joinGameSubmit" type="submit" class="buttonInput button is-small"
                                       value="Join Existing Game"/>
                            </div>
                        </form>
                    </div>
                </div>
                <br>
                <div class="section menu">
                    <div class="container">
                        <form id="createGameForm" @submit.prevent="createGame">
                            <div class="field">
                                <input id="createGameNickname" v-model="nickname" type="text"
                                       placeholder="Player Nickname..." required/>
                            </div>
                            <div class="field">
                                <input id="createGameSubmit" type="submit" class="buttonInput button is-small"
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
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: "Intro",
        data: function () {
            return {
                nickname: "",
                roomId: ""
            }
        },
        methods: {
            joinGame: function () {
                this.$store.commit("setNickname",  this.nickname);
                const joinGameMessage = {
                    event: "JoinGame",
                    nickname: this.nickname,
                    roomId: this.roomId
                }
                WebsocketService.sendObj(this.$socket, joinGameMessage)
            },
            createGame: function () {
                this.$store.commit("setNickname", this.nickname);
                const createGameMessage = {
                    event: "CreateGame",
                    nickname: this.nickname
                }
                WebsocketService.sendObj(this.$socket, createGameMessage)
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
