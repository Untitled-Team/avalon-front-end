<template>
    <div class="intro">
        <div >
            <img src="@/assets/castleBigger.png">
            <img class="title" src="@/assets/titleBig.png">
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
<!--            <br>-->
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
                this.$store.commit("setNickname", this.nickname);
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

<style lang="scss" scoped>
    @import "../styles/variables";

    .intro {
        background: $water;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-grow : 1;
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

    #joinGameForm {
        margin-bottom: 40px;
    }

    input[type=text] {
        border-radius: 0;
        -webkit-appearance: none;
        padding-top: 6px;
        border: white 1px solid;
        font-family: inherit;
        font-size: 18px;
    }
</style>
