<template>
    <div class="wrapper">
        <div id="playerInfo" v-if="!ready"
             :class="{backgroundGood: isGood, backgroundBad: isBad, backgroundAssassin: isAssassin, backgroundMerlin: isMerlin}">
            <div class="knight character" v-if="isGood">
                <div class="rolePreTextWrapper">
                    <div class="rolePreText">You are a...</div>
                </div>
                <div class="roleTextWrapper">
                    <img class="roleTextGoodGuys" src="@/assets/goodGuyTextBig.png">
                </div>
                <div class="rolePictureWrapper">
                    <img class="rolePicture" src="@/assets/goodGuyBig.png">
                </div>
                <div class="badGuysTextWrapper"></div>
                <div class="readyButtonWrapper">
                    <img class="readyButton" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
                </div>
            </div>

            <div class="warlock character" v-if="isBad">
                <div class="rolePreTextWrapper">
                    <div class="rolePreText">You are a...</div>
                </div>
                <div class="roleTextWrapper">
                    <img class="roleTextBadGuys" src="@/assets/badGuyTextBig.png">
                </div>
                <div class="rolePictureWrapper">
                    <img class="rolePicture" src="@/assets/badGuyBig.png">
                </div>
                <div class="badGuysTextWrapper">
                    <div class="badGuysText">
                        <p class="allies">Allies</p>
                        <div class="flexTest">
                            <p class="badGuyName" :key="index" v-for="(badGuy, index) in otherBadGuys">{{badGuy}}</p>
                        </div>
                    </div>
                </div>
                <div class="readyButtonWrapper">
                    <img class="readyButton" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
                </div>
            </div>

            <div class="merlin character" v-if="isMerlin">
                <div class="rolePreTextWrapper">
                    <div class="rolePreText">You are...</div>
                </div>
                <div class="roleTextWrapper">
                    <img class="roleTextGoodGuys" src="@/assets/merlinTextBig.png">
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
                    <img class="readyButton" src="@/assets/readyButtonBig.png"
                         v-on:click="confirmReady">
                </div>
            </div>

            <div class="assassin character" v-if="isAssassin">
                <div class="rolePreTextWrapper">
                    <div class="rolePreText">You are the...</div>
                </div>
                <div class="roleTextWrapper">
                    <img class="roleTextBadGuys" src="@/assets/assassinTextBig.png">
                </div>
                <div class="rolePictureWrapper">
                    <img class="rolePictureAssassin" src="@/assets/assassinBig.png">
                </div>
                <div class="badGuysTextWrapper">
                    <div class="badGuysText">
                        <p class="allies">Allies</p>
                        <div class="flexTest">
                            <p class="badGuyName" :key="index" v-for="(badGuy, index) in otherBadGuys">{{badGuy}}</p>
                        </div>
                    </div>
                </div>
                <div class="readyButtonWrapper">
                    <img class="readyButton" src="@/assets/readyButtonBig.png"
                         v-on:click="confirmReady">
                </div>
            </div>
        </div>

        <div class="ready" v-if="ready">Waiting on others to ready up...</div>
    </div>
</template>

<script>
    import store from "../store/index.js"
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'PlayerInfo',
        methods: {
            confirmReady: function () {
                const confirmReadyObj = {event: 'PlayerReady'};
                WebsocketService.sendObj(this.$socket, confirmReadyObj);
            }
        },
        computed: {
            badGuys: function () {
                return store.state.badGuys
            },
            otherBadGuys: function () {
                return this.badGuys.filter(bg => bg !== store.state.nickname);
            },
            isGood: function () {
                return store.state.character === "NormalGoodGuy"
            },
            isBad: function () {
                return store.state.character === "NormalBadGuy"
            },
            isMerlin: function () {
                return store.state.character === "Merlin"
            },
            isAssassin: function () {
                return store.state.character === "Assassin"
            },
            ready: function () {
                return store.state.playerInfo.ready
            }
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)

                if (msgJSON.event === 'PlayerReadyAcknowledgement') {
                    store.state.playerInfo.ready = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .character {
        padding: 13px;
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        background: inherit;
        height: 0;
    }

    .rolePreTextWrapper {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;

        .rolePreText {
            font-size: 2.5vh;
            color: whitesmoke;
            height: 100%;
            width: auto;
            margin-right: 12px;
        }
    }

    .roleTextWrapper {
        display: flex;
        flex: 20 1 0;
        margin: 0 auto;
        height: 0;

        img {
            object-fit: contain;
        }
    }

    .rolePictureWrapper {
        display: flex;
        flex: 40 1 0;
        justify-content: center;
        height: 0;

        img {
            object-fit: contain;
        }
    }

    .badGuysTextWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60%;
        margin: 0 auto;
        margin-top: 6px;
        margin-bottom: 5px;

        .badGuysText {
            height: 100%;
            width: 100%;
            color: whitesmoke;
            font-size: 3vh;

            .flexTest {
                display: flex;
                flex-direction: column;

                .badGuyName {
                    display: flex;
                    flex-direction: column;
                    background: rgba(black, 0.11);
                    width: 100%;
                    margin: 0 auto;
                    margin-bottom: 3px;
                }
            }
        }
    }

    .readyButtonWrapper {
        height: 13%;
        margin-top: 1%;

        .readyButton {
            height: 100%;
            width: auto;
        }
    }

    .knight {
        .roleTextWrapper {
            margin-top: 3px;
            margin-bottom: 3px;
        }

        .rolePictureWrapper {
            flex: 50 1 0;
            margin-left: 8%;
        }
    }

    .warlock {
        .rolePictureWrapper {
            margin-left: 4%;
        }
    }

    .assassin {
        .rolePictureWrapper {
            margin-left: 4%;
        }
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
    }

    #playerInfo {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        box-shadow: 1 0 0 20px $outsideBorder;
        border: 10px solid $insideBorder;
        height: 0;
    }

    #playerInfo:before {
        pointer-events: none;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: absolute;
        display: block;
        content: '';
        margin: 10px;
        border: 10px solid $outsideBorder;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .readyButtonWrapper {
        margin-bottom: 5px;
    }

    .ready {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        padding: 20px;
        padding-bottom: 0px;
        background-color: $incomplete;
        color: whitesmoke;
        font-size: 3em;
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

    .backgroundBad {
        background-color: #C7383E;
    }
</style>