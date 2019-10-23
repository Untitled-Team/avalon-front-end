<template>
    <div id="playerInfo">
        <div v-if="isGood">
            <img class="cardText" src="@/assets/goodGuyTextBig.png">
            <img class="cardPicture" src="@/assets/goodGuyBig.png">
            <img class="readyButton" v-show="!ready" v-on:click="confirmReady" src="@/assets/readyButtonBig.png">
        </div>

        <div v-if="isBad">
            <img class="cardPicture" src="@/assets/badGuyBig.png">
            <div class="badGuysText">
                <p class="allies">Allies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
            <img class="readyButton" v-show="!ready" v-on:click="confirmReady" src="@/assets/readyButtonBig.png">
        </div>

        <div v-if="isMerlin">
            <img class="cardText" src="@/assets/merlinTextBig.png">
            <img class="cardPicture" src="@/assets/merlinBig.png">
            <div class="badGuysText">
                <p class="allies">Enemies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
            <button class="readyButton" v-show="!ready" v-on:click="confirmReady">MERLIN READY BUTTON</button>
        </div>

        <div v-if="isAssassin">
            <img class="cardText" src="@/assets/assassinTextBig.png">
            <img class="cardPicture" src="@/assets/assassinBig.png">
            <div class="badGuysText">
                <p class="allies">Allies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
            <button class="readyButton" v-show="!ready" v-on:click.prevent="confirmReady"><img src="@/assets/readyButtonBig.png"></button>
            <div class="readyButtonText">Ready</div>
        </div>

        <div class="ready" v-show="ready">Great! Once everybody is ready the first mission will begin.</div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'PlayerInfo',
        data: function () {
            return {
                ready: false
            }
        },
        props: ["character", "badGuys"],
        methods: {
            confirmReady: function () {
                console.log('player ready clicked')
                let confirmReadyObj = {event: 'PlayerReady'};
                WebsocketService.sendObj(this.$socket, confirmReadyObj);
            }
        },
        computed: {
            isGood: function () {
                return this.character === "NormalGoodGuy"
            },
            isBad: function () {
                return this.character === "NormalBadGuy"
            },
            isMerlin: function () {
                return this.character === "Merlin"
            },
            isAssassin: function () {
                return this.character === "Assassin"
            }
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)
                console.log(msgJSON)

                if (msgJSON.event === 'PlayerReadyAcknowledgement') {
                    this.ready = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .cardText {
        margin-top: 3%;
        width: 75%;
    }

    .cardPicture {
        margin-top: -30%;
        margin-bottom: -10%;
    }

    .badGuysText {
        margin-top: -5%;
        color: white;
        font-size: 3em;
        margin-left: auto;
        margin-right: auto;
    }

    .readyButton {
        margin-top: 5%;
    }

    .readyButtonText {
        top: 25%;
        left: 15%;
    }


    #playerInfo {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #123;
        height: 100vh;
        border: 10px solid $insideBorder;
    }
    /*THIS IS FUCKING with my button!!!  it's sitting on top of it for some reason...*/
    #playerInfo:before {pointer-events:none;

        position: absolute;
        display: block;
        content: '';
        border: 8px solid $outsideBorder;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .ready {
        position: absolute;
        bottom: 0;
        background-color: seagreen;
        color: sandybrown;
        font-size: 3em;
        width: 100%;
    }

    .flexTest {
        display: flex;
        flex-wrap: wrap;
    }

    .badGuyName {
        flex: 0 50%;
    }

    .allies {
        text-decoration: underline;
    }
</style>