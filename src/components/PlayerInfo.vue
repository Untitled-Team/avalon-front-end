<template>
    <div id="playerInfo"
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
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
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
                <img class="readyButton" v-show="!ready" src="@/assets/readyButtonBig.png" v-on:click="confirmReady">
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

    .knight {
        .rolePreTextWrapper {
            margin-top: 13px;

            .rolePreText {
                font-size: 2.5vh;
                color: white;
                height: 100%;
                width: auto;
                margin-right: 12px;
            }
        }

        .badGuysTextWrapper {
            display: none;
        }

        .roleTextWrapper {
            height: 23%;
            margin-top: -15px;
            margin-bottom: 4px;

            .roleTextGoodGuys {
                height: 100%;
                width: auto;
            }
        }

        .rolePictureWrapper {
            height: 55%;
            margin-left: 7%;
            /*margin-top: 5%;*/

            .rolePicture {
                height: 100%;
                width: auto;
            }
        }

        .readyButtonWrapper {
            height: 14%;
            margin-top: 3%;

            .readyButton {
                height: 100%;
                width: auto;
            }
        }
    }

    .warlock {
        /*display: flex;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        padding: 18px;

        .rolePreTextWrapper {
            display: flex;
            flex: 1em 1 0;
            margin: 0 auto;
            /*flex-grow: 1;*/
            /*justify-content: center;*/

            .rolePreText {
                font-size: 2.5vh;
                color: white;
                height: 100%;
                width: auto;
                margin-right: 12px;
            }
        }

        .roleTextWrapper {
            display: flex;
            flex: 20 1 0;
            margin-top: -20px;

            img {
                object-fit: contain;
            }

            .roleTextBadGuys {
            }
        }

        .rolePictureWrapper {
            display: flex;
            flex: 40 1 0;
            justify-content: center;
            /*margin: 0 auto;*/
            margin-left: 4%;
            /*margin-left: 4%;*/

            img {
                object-fit: contain;
            }

            .rolePicture {
            }
        }

        .badGuysTextWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60%;
            margin: 0 auto;
            margin-top: 6px;

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
    }


    /*.rolePreTextWrapper {*/
    /*    height: 3.5%;*/
    /*    margin-top: 4%;*/

    /*    .rolePreText {*/
    /*        font-size: 3vh;*/
    /*        color: white;*/
    /*        height: 100%;*/
    /*        width: auto;*/
    /*    }*/
    /*}*/

    /*.roleTextWrapper {*/
    /*    height: 15%;*/

    /*    .roleTextGoodGuys {*/
    /*        height: 100%;*/
    /*        width: auto;*/
    /*    }*/

    /*    .roleTextBadGuys {*/
    /*        height: 75%;*/
    /*        width: auto;*/
    /*    }*/
    /*}*/

    /*.rolePictureWrapper {*/
    /*    height: 45%;*/
    /*    !*margin-top: 5%;*!*/

    /*    .rolePicture {*/
    /*        height: 100%;*/
    /*        width: auto;*/
    /*    }*/

    /*    .rolePictureAssassin {*/
    /*        height: 70%;*/
    /*        width: auto;*/
    /*        margin-top: 10%;*/
    /*    }*/
    /*}*/

    /*.badGuysTextWrapper {*/
    /*    height: 10%;*/
    /*    margin-top: 7px;*/
    /*    !*margin-top: 5%;*!*/

    /*    .badGuysText {*/
    /*        height: 100%;*/
    /*        width: auto;*/
    /*        color: whitesmoke;*/
    /*        font-size: 3vh;*/

    /*        .flexTest {*/
    /*            display: flex;*/
    /*            flex-wrap: nowrap;*/

    /*            .badGuyName {*/
    /*                flex: 0 50%;*/
    /*            }*/
    /*        }*/
    /*    }*/
    /*}*/

    /*.readyButtonWrapper {*/
    /*    height: 13%;*/
    /*    margin-top: 3%;*/

    /*    .readyButton {*/
    /*        height: 100%;*/
    /*        width: auto;*/
    /*    }*/
    /*}*/

    #playerInfo {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        /*justify-content: flex-start;*/
        /*position: absolute;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*bottom: 0;*/
        /*padding: 10px;*/
        box-shadow: 1 0 0 20px $outsideBorder;
        border: 10px solid $insideBorder;
        /*<!--border: 10px solid $outsideBorder;-->*/

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

    .ready {
        position: absolute;
        bottom: 0;
        background-color: seagreen;
        color: sandybrown;
        font-size: 3em;
        width: 100%;
        height: 15%;
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
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        /*height: 100%;*/
        background: inherit;
    }

    @media (max-height: 1000px) {
        .knight {
            .roleTextWrapper {
                height: 22%;
            }
        }
    }

    @media (max-height: 700px) {
        .knight {
            .roleTextWrapper {
                height: 22%;
            }
        }
    }

    @media (max-height: 553px) {
        /*.rolePreTextWrapper {*/
        /*    height: 3.5%;*/
        /*}*/

        /*.rolePictureWrapper {*/
        /*    height: 40%;*/
        /*}*/

        /*.badGuysTextWrapper {*/
        /*    height: 10%;*/
        /*}*/

        /*.readyButtonWrapper {*/
        /*    height: 10%;*/
        /*}*/
    }

    @media (max-height: 472px) {
        /*.rolePreTextWrapper {*/
        /*    height: 2.5%;*/
        /*}*/

        /*.roleTextWrapper {*/
        /*    height: 20%;*/
        /*}*/

        /*.rolePictureWrapper {*/
        /*    height: 40%;*/
        /*}*/

        /*.badGuysTextWrapper {*/
        /*    height: 8%;*/
        /*}*/

        /*.readyButtonWrapper {*/
        /*    height: 13%;*/
        /*}*/
    }
</style>