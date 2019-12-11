<template>
    <div class="intro">
        <img class="castle" src="@/assets/castleBigger.png">
        <img class="title" src="@/assets/titleBig.png">
        <div class="menuContent">
            <div class="createAndJoinGameForms" v-if="!createGameConfigure">
                <form id="joinGameForm" @submit.prevent="joinGame" v-if="!createGameConfigure">
                    <div class="field">
                        <input id="joinGameNickname" v-model="nickname" type="text"
                               placeholder="Player Nickname..." maxlength="12" required/>
                    </div>
                    <div class="field">
                        <input id="joinGameRoomId" v-model="roomId" type="text" placeholder="Room ID..."
                               required/>
                    </div>
                    <div class="field">
                        <button type="submit" id="joinGameSubmit">
                            <img src="@/assets/joinGameButton.png">
                        </button>
                    </div>
                </form>
                <form id="createGameForm" @submit.prevent="toggleConfigureScreen">
                    <div class="field">
                        <input id="createGameNickname" v-model="nickname" type="text"
                               placeholder="Player Nickname..." maxlength="12" required/>
                    </div>
                    <div class="field">
                        <button type="submit" id="createGameSubmit">
                            <img src="@/assets/createGameButton.png">
                        </button>
                    </div>
                </form>
            </div>

            <div class="configure" v-if="createGameConfigure">
                <button @click="toggleConfigureScreen">back</button>
                <div>CHARACTERS:</div>
                <label><input type="checkbox" name="char1">optional char #1</label>
                <label><input type="checkbox" name="char2">optional char #2</label>
                <label><input type="checkbox" name="char3">optional char #3</label>
                <label><input type="checkbox" name="char4">optional char #4</label>

                <br/>
                <br/>

                <div>GAME MODE:</div>
                <label><input type="radio" name="gameMode">easy</label>
                <label><input type="radio" name="gameMode">hard</label>

                <img @click="createGame" src="@/assets/createGameButton.png">
            </div>
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";
    import store from "../store/index.js"

    export default {
        name: "Intro",
        data: function () {
            return {
                nickname: "",
                roomId: "",
                createGameConfigure: false
            }
        },
        methods: {
            joinGame: function () {
                store.commit("setNickname", this.nickname);
                const joinGameMessage = {
                    event: "JoinGame",
                    nickname: this.nickname,
                    roomId: this.roomId.trim()
                }
                WebsocketService.sendObj(this.$socket, joinGameMessage)
            },
            toggleConfigureScreen: function () {
                this.createGameConfigure = !this.createGameConfigure
            },
            createGame: function () {
                store.commit("setNickname", this.nickname);
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
    @import "../styles/mixins";

    .configure {
        font-size: 3em;
        display: flex;
        flex-direction: column;

        img {
            margin-top: 3%;
            align-self: center;
            max-width: 54%;
        }

        button {
            border: 1px black solid;
            background-color: grey;
        }
    }

    button {
        background-color: inherit;
        border: 0;
    }

    #joinGameSubmit {
        max-width: 50%;
    }

    #createGameSubmit {
        max-width: 54%;
    }

    .menuContent {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        justify-content: center;
    }

    .intro {
        background: $water;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .field {
        padding: 3px;
    }

    .title {
        position: absolute;
        width: 60%;
        top: 6.5%;
        left: 20%;
        right: 20%;
    }

    input[type=text] {
        border-radius: 0;
        -webkit-appearance: none;
        padding-top: 6px;
        border: white 1px solid;
        font-family: inherit;
        font-size: 16px;
    }

    @media (max-height: 1500px) {
        .menuContent {
            margin-top: -45px;
        }

        #joinGameForm {
            margin-bottom: 100px;
        }

        input[type=text] {
            font-size: 4.5em;
        }
    }

    @media (max-height: 1000px) {
        .menuContent {
            margin-top: -45px;
        }

        #joinGameForm {
            margin-bottom: 100px;
        }

        input[type=text] {
            font-size: 2.7em;
        }
    }

    @media (max-height: 700px) {
        .title {
            top: 6.5%;
        }

        #joinGameForm {
            margin-bottom: 45px;
        }

        input[type=text] {
            font-size: 2.3em;
        }
    }

    @media (max-height: 553px) {
        .title {
            top: 2.5%;
        }

        .castle {
            margin-top: -25px;
        }

        #joinGameForm {
            margin-bottom: 35px;
        }

        input[type=text] {
            font-size: 17px;
        }
    }

    @media (max-height: 472px) {

        .menuContent {
            margin-top: -20px;
        }

        .castle {
            margin-top: -35px;
        }

        .title {
            top: 2%;
        }

        #joinGameForm {
            margin-bottom: 20px;
        }
    }

</style>
