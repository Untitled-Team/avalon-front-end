<template>
    <div id="playerInfo"
         :class="{backgroundGood: isGood, backgroundBad: isBad, backgroundAssassin: isAssassin, backgroundMerlin: isMerlin}">
        <div class="good character" v-if="isGood">
            <div class="rolePreTextWrapper">
                <div class="rolePreText">You are a...</div>
            </div>
            <div class="roleTextWrapper">
                <img class="roleText" src="@/assets/goodGuyTextBig.png">
            </div>
            <div class="rolePictureWrapper">
                <img class="rolePicture" src="@/assets/goodGuyBig.png">
            </div>
            <div class="badGuysTextWrapper"></div>
            <div class="readyButtonWrapper">
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
            </div>
        </div>

        <div class="bad character" v-if="isBad">
            <div class="rolePreTextWrapper">
                <div class="rolePreText">You are a...</div>
            </div>
            <div class="roleTextWrapper">
                <img class="roleText" src="@/assets/badGuyTextBig.png">
            </div>
            <div class="rolePictureWrapper">
                <img class="rolePicture" src="@/assets/badGuyBig.png">
            </div>
            <div class="badGuysTextWrapper">
                <div class="badGuysText">
                    <p class="allies">Allies</p>
                    <div class="flexTest">
                        <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                    </div>
                </div>
            </div>
            <div class="readyButtonWrapper">
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
            </div>
        </div>

        <div class="merlin character" v-if="isMerlin">
            <div class="rolePreTextWrapper">
                <div class="rolePreText">You are...</div>
            </div>
            <div class="roleTextWrapper">
                <img class="roleText" src="@/assets/merlinTextBig.png">
            </div>
            <div class="rolePictureWrapper">
                <img class="rolePicture" src="@/assets/merlinBig.png">
            </div>
            <div class="badGuysTextWrapper">
                <div class="badGuysText">
                    <p class="allies">Enemies</p>
                    <div class="flexTest">
                        <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                    </div>
                </div>
            </div>
            <div class="readyButtonWrapper">
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
            </div>
        </div>

        <div class="assassin character" v-if="isAssassin">
            <div class="rolePreTextWrapper">
                <div class="rolePreText">You are the...</div>
            </div>
            <div class="roleTextWrapper">
                <img class="roleText" src="@/assets/assassinTextBig.png">
            </div>
            <div class="rolePictureWrapper">
                <img class="rolePicture" src="@/assets/assassinBig.png">
            </div>
            <div class="badGuysTextWrapper">
                <div class="badGuysText">
                    <p class="allies">Allies</p>
                    <div class="flexTest">
                        <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                    </div>
                </div>
            </div>
            <div class="readyButtonWrapper">
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
            </div>
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

    .rolePreTextWrapper {
        margin-top: 4%;

        .rolePreText {
            font-size: 4vh;
            color: white;
            height: 100%;
            width: auto;
        }
    }

    .roleTextWrapper {
        height: 12vh;

        .roleText {
            height: 100%;
            width: auto;
        }
    }

    .rolePictureWrapper {
        height: 45vh;
        margin-top: -25%;

        .rolePicture {
            height: 100%;
            width: auto;
        }
    }

    .badGuysTextWrapper {
        margin-top: -10%;

        .badGuysText {
            height: 100%;
            width: auto;
            color: whitesmoke;
            font-size: 3.5vh;
        }
    }

    .readyButtonWrapper {
        height: 15vh;
        margin-top: 5%;

        .readyButton {
            height: 100%;
            width: auto;
        }
    }

    #playerInfo {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: 10px solid $insideBorder;
    }

    /*THIS IS FUCKING with my button!!!  it's sitting on top of it for some reason...*/
    #playerInfo:before {
        pointer-events: none;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: absolute;
        display: block;
        content: '';
        border: 8px solid $outsideBorder;
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

    .cardText {
        width: 65%;
        height: auto;
        margin: auto;
        position: absolute;
        left: 17.5%;
        right: 17.5%;
        top: 15%;
    }

    .cardPicture {
        width: 95%;
        height: auto;
        margin: auto;
        position: absolute;
        left: 2.5%;
        right: 2.5%;
        top: -4%;
    }

    .cardBackground {
        width: 100%;
        height: auto;
        margin: auto;
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

    .backgroundGood {
        background-color: #35966E;
    }

    .backgroundMerlin {
        background-color: #669AFD;
    }

    .backgroundAssassin {
        background-color: #C7383E;
    }

    .character {
        flex-basis: c;
        background: inherit;
    }
</style>