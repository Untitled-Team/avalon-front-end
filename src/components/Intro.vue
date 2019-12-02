<template>
    <div class="intro">
        <img class="castle" src="@/assets/castleBigger.png">
        <img class="title" src="@/assets/titleBig.png">
        <div class="menuContent">
            <div id="joinGameForm">
                <div class="textBox">
                    <input id="joinGameNickname" v-model="nickname" type="text"
                           placeholder="Nickname..." maxlength="12" required/>
                </div>
                <div class="textBox">
                    <input id="joinGameRoomId" v-model="roomId" type="text" placeholder="Game ID..."
                           required/>
                </div>
                <div class="buttonImageWrapper">
                    <img src="@/assets/joinGameButton.png" v-on:click="joinGame">
                </div>
            </div>
            <div>
                <div class="textBox">
                    <input id="createGameNickname" v-model="nickname" type="text"
                           placeholder="Nickname..." maxlength="12" required/>
                </div>
                <div class="buttonImageWrapper">
                    <img src="@/assets/createGameButton.png" v-on:click="createGame">
                </div>
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
                roomId: ""
            }
        },
        methods: {
            joinGame: function () {
                store.commit("setNickname", this.nickname);
                const joinGameMessage = {
                    event: "JoinGame",
                    nickname: this.nickname,
                    roomId: this.roomId
                }
                WebsocketService.sendObj(this.$socket, joinGameMessage)
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

    .buttonImageWrapper {
        display: flex;
        flex: 1 1 0;
        height: 35px;
    }

    .textBox {
        margin-bottom: 15px;
    }

    img {
        display: flex;
        object-fit: contain;
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
            margin-bottom: 85px;
        }

        .buttonImageWrapper {
            height: 50px;
        }

        input[type=text] {
            font-size: 2.7em;
        }
    }

    @media (max-height: 700px) {
        .title {
            top: 6.5%;
        }

        .buttonImageWrapper {
            height: 40px;
        }

        #joinGameForm {
            margin-bottom: 60px;
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
