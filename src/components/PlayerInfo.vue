<template>
    <div class="wrapper">
        <div id="playerInfo"
             :class="{
                 backgroundGood: isGood,
                 backgroundBad: isBad,
                 backgroundAssassin: isAssassin,
                 backgroundMerlin: isMerlin,
                 backgroundPercival: isPercival,
                 backgroundMordred: isMordred,
                 backgroundOberon: isOberon,
                 backgroundMorgana: isMorgana
                }"
        >
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
                    <img class="readyButton" src="@/assets/readyButtonWithTextBigFinal.png"
                         v-on:click="moveToFirstMission">
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
                    <img class="rolePicture" src="@/assets/warlock.png">
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
                    <img class="readyButton" src="@/assets/readyButtonWithTextBigFinal.png"
                         v-on:click="moveToFirstMission">
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
                    <img class="readyButton" src="@/assets/readyButtonWithTextBigFinal.png"
                         v-on:click="moveToFirstMission">
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
                        <p class="allies" v-if="otherBadGuys.length !== 0">Allies</p>
                        <div class="flexTest">
                            <p class="badGuyName" :key="index" v-for="(badGuy, index) in otherBadGuys">{{badGuy}}</p>
                        </div>
                    </div>
                </div>
                <div class="readyButtonWrapper">
                    <img class="readyButton" src="@/assets/readyButtonWithTextBigFinal.png"
                         v-on:click="moveToFirstMission">
                </div>
            </div>

            <div class="percival character" v-if="isPercival">
                <div class="rolePreTextWrapper">
                    <div class="rolePreText">You are</div>
                </div>
                <div class="roleTextWrapper">
                    PERCIVAL
                </div>
                <div class="rolePictureWrapper">
                    <img class="rolePicture" src="@/assets/percival.png">
                </div>
                <div class="badGuysTextWrapper">
                    <div class="badGuysText">
                        <p class="allies">Merlin</p>
                        <div class="flexTest">
                            <p class="badGuyName" :key="index" v-for="(badGuy, index) in merlinAndMorgana">
                                {{badGuy}}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="readyButtonWrapper">
                    <img class="readyButton" src="@/assets/readyButtonWithTextBigFinal.png"
                         v-on:click="moveToFirstMission">
                </div>
            </div>

            <div class="mordred character" v-if="isMordred">
                <div class="rolePreTextWrapper">
                    <div class="rolePreText">You are</div>
                </div>
                <div class="roleTextWrapper">
                    MORDRED
                </div>
                <div class="rolePictureWrapper">
                    <img class="rolePicture" src="@/assets/mordred.png">
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
                    <img class="readyButton" src="@/assets/readyButtonWithTextBigFinal.png"
                         v-on:click="moveToFirstMission">
                </div>
            </div>

            <div class="oberon character" v-if="isOberon">
                <div class="rolePreTextWrapper">
                    <div class="rolePreText">You are...</div>
                </div>
                <div class="roleTextWrapper">
                    OBERON
                </div>
                <div class="rolePictureWrapper">
                    <img class="rolePicture" src="@/assets/oberon.jpeg">
                </div>
                <div class="badGuysTextWrapper"></div>
                <div class="readyButtonWrapper">
                    <img class="readyButton" src="@/assets/readyButtonWithTextBigFinal.png"
                         v-on:click="moveToFirstMission">
                </div>
            </div>

            <div class="morgana character" v-if="isMorgana">
                <div class="rolePreTextWrapper">
                    <div class="rolePreText">You are</div>
                </div>
                <div class="roleTextWrapper">
                    <div class="morganaBigText"> m0rG4n4</div>
                </div>
                <div class="rolePictureWrapper">
                    <img class="rolePicture" src="@/assets/morgana.png">
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
                    <img class="readyButton" src="@/assets/readyButtonWithTextBigFinal.png"
                         v-on:click="moveToFirstMission">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PlayerInfo',
        methods: {
            moveToFirstMission: function () {
                this.$store.dispatch("stepTwoToQuestPhase");
            }
        },
        computed: {
            badGuys: function () {
                return this.$store.state.badGuys
            },
            merlinAndMorgana: function () {
                return this.$store.state.PlayerInfo.merlin;
            },
            otherBadGuys: function () {
                return this.badGuys.filter(bg => bg !== this.$store.state.nickname);
            },
            isGood: function () {
                return this.$store.state.character === "NormalGoodGuy"
            },
            isBad: function () {
                return this.$store.state.character === "NormalBadGuy"
            },
            isMerlin: function () {
                return this.$store.state.character === "Merlin"
            },
            isAssassin: function () {
                return this.$store.state.character === "Assassin"
            },
            isPercival: function () {
                return this.$store.state.character === "Percival"
            },
            isMordred: function () {
                return this.$store.state.character === "Mordred"
            },
            isOberon: function () {
                return this.$store.state.character === "Oberon"
            },
            isMorgana: function () {
                return this.$store.state.character === "Morgana"
            },
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
        flex: 20 1 auto;
        margin: 0 auto;
        height: 0;

        img {
            object-fit: contain;
        }
    }

    .rolePictureWrapper {
        display: flex;
        flex: 40 1 auto;
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
            flex: 50 1 auto;
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

    .backgroundPercival {
        background-color: #35966E;
    }

    .backgroundMordred {
        background-color: #C7383E;
    }

    .backgroundOberon {
        background-color: #C7383E;
    }

    .backgroundMorgana {
        background-color: #C7383E;
    }

    .morganaBigText {
        font-size: 35px;
        margin-top: 10px;
    }
</style>
