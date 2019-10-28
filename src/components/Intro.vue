<template>
    <div class="intro">
            <img class="castle" src="@/assets/castleBigger.png">
            <img class="title" src="@/assets/titleBig.png">
            <div class="menuContent">
                <form id="joinGameForm" @submit.prevent="joinGame">
                    <div class="field">
                        <input id="joinGameNickname" v-model="nickname" type="text"
                               placeholder="Player Nickname..." maxlength="12" required/>
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
                <form id="createGameForm" @submit.prevent="createGame">
                    <div class="field">
                        <input id="createGameNickname" v-model="nickname" type="text"
                               placeholder="Player Nickname..." maxlength="12" required/>
                    </div>
                    <div class="field">
                        <input id="createGameSubmit" type="submit" class="buttonInput button is-small" value="Create a New Game"/>
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
        flex-grow : 1;
    }

    .field {
        padding: 3px;
    }

    .title {
        position: absolute;
        width: 60%;
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

    @media /*(max-width: 414px) and */ (max-height: 1000px) {
        .menuContent {
            margin-top: -45px;
        }

        .title {
            top: 6.5%;
        }

        #joinGameForm {
            margin-bottom: 50px;
        }

        input[type=text] {
            font-size: 20px;
        }
    }

    @media /*(max-width: 375px) and*/ (max-height: 553px) {
        /*.menuContent {*/
            /*margin-top: -40px;*/
        /*}*/

        .title {
            top: 6.5%;
        }

        #joinGameForm {
            margin-bottom: 35px;
        }

        input[type=text] {
            font-size: 17px;
        }
    }

    @media (max-height : 472px) /*and (max-width : 320px)*/ {

        .menuContent {
            display: flex;
            flex: 1 1 0;
            flex-direction: column;
            justify-content: center;
            margin-top: -20px;
        }

        .castle {
            margin-top: -30px;
        }

        .title {
            top: 3%;
        }

        #joinGameForm {
            margin-bottom: 20px;
        }
    }

</style>
