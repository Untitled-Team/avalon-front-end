<template>
    <div id="playerInfo" :class="{backgroundGood: isGood, backgroundBad: isBad, backgroundAssassin: isAssassin, backgroundMerlin: isMerlin}">
        <div class="good character" v-if="isGood">
            <div class="rolePreText">You are a...</div>
            <img class="roleText" src="@/assets/goodGuyTextBig.png">
            <img class="rolePicture" src="@/assets/goodGuyBig.png">
            <div class="readyButtonWrapper">
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
                <div class="readyButtonText">Ready</div>
            </div>
        </div>

        <div class="bad character" v-if="isBad">
            <div class="rolePreText">You are a...</div>
            <img class="rolePicture" src="@/assets/badGuyBig.png">
            <div class="badGuysText">
                <p class="allies">Allies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
            <div class="readyButtonWrapper">
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
                <div class="readyButtonText">Ready</div>
            </div>
        </div>

        <div class="merlin character" v-if="isMerlin">
            <div class="rolePreText">You are...</div>
            <img class="roleText" src="@/assets/merlinTextBig.png">
            <img class="rolePicture" src="@/assets/merlinBig.png">
            <div class="badGuysText">
                <p class="allies">Enemies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
            <div class="readyButtonWrapper">
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
                <div class="readyButtonText">Ready</div>
            </div>
        </div>

        <div class="assassin character" v-if="isAssassin">
            <div class="rolePreText">You are the...</div>
            <img class="roleText" src="@/assets/assassinTextBig.png">
            <img class="rolePicture" src="@/assets/assassinBig.png">
            <div class="badGuysText">
                <p class="allies">Allies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
            <div class="readyButtonWrapper">
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
                <div class="readyButtonText">Ready</div>
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

    .rolePreText {
        margin-top: 5%;
        font-size: 4em;
        color: white;
    }

    .roleText {
        margin-top: 3%;
        width: 75%;
    }

    .rolePicture {
        margin-top: -30%;
        margin-bottom: -10%;
        max-height: 40%;
    }

    .readyButtonWrapper {
        margin-top: 5vh;
        position: relative;
        display: inline-block;
    }

    .readyButtonWrapper .readyButtonText {
        position: absolute;
        z-index: 999;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 35%; /* Adjust this value to move the positioned div up and down */
        text-align: center;
        width: 60%; /* Set the width of the positioned div */
        font-size: 4em;
        color: antiquewhite;
    }

    .badGuysText {
        margin-top: -5%;
        color: antiquewhite;
        font-size: 3em;
        margin-left: auto;
        margin-right: auto;
    }

    #playerInfo {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100vh;
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
        background: inherit;
    }
</style>