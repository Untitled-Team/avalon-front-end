<template>
    <div id="lobby">
        <img class="castle" src="@/assets/castleBigger.png">
        <img class="title" src="@/assets/titleBig.png">

        <div class="lobbyData" v-if="!createGameConfigure">
            <div class="lobbyText">
                <p class="waitingForPlayers is-size-4-mobile is-size-4-desktop" v-if="!correctPlayerNumbers">Waiting for
                    players...</p>
                <p class="roomId">Access code: {{ roomId }}</p>
            </div>
            <div class="players">
                <div class="lobbyPlayer" :key="index" v-for="(player, index) in players">
                    {{ player }}
                </div>
            </div>

            <div class="buttonContainer">
                <img src="@/assets/beginButtonBig.png" v-on:click="toggleConfigureScreen" v-show="correctPlayerNumbers"
                     class="beginButton">
                <LeaveGame class="leaveGame"/>
            </div>

            <div id="warning" class="gameRequirement is-size-6-mobile" v-if="!correctPlayerNumbers">
                5 - 10 players required
            </div>
        </div>

        <div class="configure" v-if="createGameConfigure">
            <div>OPTIONAL CHARACTERS:</div>

            <label for="Morgana">
                <img v-show="!morganaChecked" src="../assets/checkbox.png">
                <img v-show="morganaChecked" src="../assets/badGuyChecked.png">
                <span>Morgana</span>
            </label>
            <input type="checkbox" id="Morgana" v-model="optionalChars" value="Morgana">


            <label for="Mordred">
                <img v-show="!mordredChecked" class="checkboxImgMordred" src="../assets/checkbox.png">
                <img v-show="mordredChecked" src="../assets/badGuyChecked.png">
                <span>Mordred</span>
            </label>
            <input type="checkbox" id="Mordred" v-model="optionalChars" value="Mordred">

            <label for="Percival">
                <img v-show="!percivalChecked" class="checkboxImgPercival" src="../assets/checkbox.png">
                <img v-show="percivalChecked" src="../assets/goodGuyChecked.png">
                <span>Percival</span>
            </label>
            <input type="checkbox" id="Percival" v-model="optionalChars" value="Percival">

            <label for="Oberon">
                <img v-show="!oberonChecked" class="checkboxImgPercival" src="../assets/checkbox.png">
                <img v-show="oberonChecked" src="../assets/badGuyChecked.png">
                <span>Oberon</span>
            </label>
            <input type="checkbox" id="Oberon" v-model="optionalChars" value="Oberon">

            <img class="startGameButton" @click="startGame" src="@/assets/createGameButton.png">
            <button @click="toggleConfigureScreen">Back</button>
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";
    import LeaveGame from "./LeaveGame"

    export default {
        name: 'Lobby',
        components: {
            LeaveGame
        },
        data: function () {
            return {
                createGameConfigure: false,
                optionalChars: [],
            }
        },
        computed: {
            players: function () {
                return this.$store.state.players
            },
            correctPlayerNumbers: function () {
                return this.players.length >= 5 && this.players.length <= 10
            },
            roomId: function () {
                return this.$store.state.roomId
            },
            morganaChecked: function () {
                return this.optionalChars.includes("Morgana")
            },
            mordredChecked: function () {
                return this.optionalChars.includes("Mordred")
            },
            percivalChecked: function () {
                return this.optionalChars.includes("Percival")
            },
            oberonChecked: function () {
                return this.optionalChars.includes("Oberon")
            },

        },
        methods: {
            startGame: function () {
                if (this.correctPlayerNumbers) {
                    const config = {
                        morgana: this.morganaChecked,
                        mordred: this.mordredChecked,
                        percival: this.percivalChecked,
                        oberon: this.oberonChecked
                    }
                    const StartGameMessage = {event: 'StartGame', gameConfig: {...config}};
                    WebsocketService.sendObj(this.$socket, StartGameMessage);
                }
            },
            toggleConfigureScreen: function () {
                this.createGameConfigure = !this.createGameConfigure
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    label {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 20px;
            margin-right: 2%;
        }

        span {
            padding-top: 2.5%;
        }
    }

    input[type=checkbox] {
        display: none;
    }

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
            width: 35%;
            margin: 3% auto;
        }
    }

    .beginButton {
        display: flex;
        height: 30px;
        margin-right: 3px;
    }

    .buttonContainer {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
    }

    .startButton {
        display: flex;
    }

    .leaveGame {
        display: flex;
    }

    .leaveGame {
        img {
            max-height: 40px;
        }
    }

    .roomId {
        font-size: 2em;
    }

    .lobbyText {
        margin-top: -15px;
    }

    .players {
        padding-bottom: 5px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 58%;
    }

    .lobbyPlayer {
        padding-top: 1px;
        padding-bottom: 1px;
        margin-top: 3px;
        background: rgba(black, 0.11);
        font-size: 2em;
    }

    #lobby {
        background: $water;
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    input[type=submit] {
        font-family: inherit;
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 0;
        border: $successful solid 1px;
        appearance: none;
        padding-right: 23px;
        padding-left: 25px;
        font-size: 2.3em;
        font-weight: bold;
        background: $successful;
        color: whitesmoke;
    }

    .title {
        position: absolute;
        top: 5.5%;
        width: 60%;
        left: 20%;
        right: 20%;
    }

    .bold {
        font-weight: bold;
    }

    .lobbyData {
        flex-direction: column;
        display: flex;
    }

    @media (max-height: 1500px) {
        .lobbyPlayer {
            font-size: 4em;
        }

        .roomId {
            font-size: 4em;
        }

    }

    @media (max-height: 1000px) {
        .lobbyPlayer {
            font-size: 2.7em;
        }

        .roomId {
            font-size: 3em;
        }
    }

    @media (max-height: 700px) {
        .lobbyPlayer {
            font-size: 2.5em;
        }

        .roomId {
            font-size: 2.7em;
        }
    }

    @media (max-height: 553px) {

        .lobbyPlayer {
            font-size: 2.1em;
        }

        .roomId {
            font-size: 2.1em;
        }

        .title {
            top: 2.5%;
        }

        .castle {
            margin-top: -25px;
        }
    }

    @media (max-height: 472px) {

        .lobbyPlayer {
            font-size: 2em;
        }

        .roomId {
            font-size: 2em;
        }

        .castle {
            margin-top: -35px;
        }

        .title {
            top: 2%;
        }

        .players {
            padding-bottom: 4px;
        }

        input[type=submit] {
            font-size: 2em;
        }
    }
</style>
