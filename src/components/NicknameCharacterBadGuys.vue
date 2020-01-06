<template>
    <div id="nicknameCharacterBadGuys">
        <div class="playerInfoModal" v-if="modalActive">
            <div class="permanentPlayerInfo is-centered">

                <LeaveGame class="leaveGame"/>

                <div id="nickname" class="fontSizing">Nickname: {{ nickname }}</div>
                <div id="character" class="fontSizing">Role: {{ character }}</div>
                <div id="badGuys" v-if="shouldSeeBadGuys" class="fontSizing">
                    {{badGuysText}}
                    <span v-for="(badGuy, index) in otherBadGuys" :key="index">
                        {{badGuy}}
                    </span>
                </div>
                <div id="merlin" v-if="isPercival" class="fontSizing">
                    Merlin:
                    <span v-for="(m, index) in merlin" :key="index">
                        {{m}}
                    </span>
                </div>
                <div class="specialCharacters fontSizing">
                    Special Characters enabled:
                    <div v-if="percivalEnabled">Percival</div>
                    <div v-if="oberonEnabled">Oberon</div>
                    <div v-if="morganaEnabled">Morgana</div>
                    <div v-if="mordredEnabled">Mordred</div>
                </div>
            </div>
        </div>

        <div class="envelopeContainer" v-on:click="toggleModalActive" :class="{openedEnvelope: openedEnvelope}">
            <div class="envelopeTop"></div>
            <div class="redStamp">
                <img class="rolePicture" src="@/assets/redStampEnvelope.png">
            </div>
            <div class="envelopeRowContainer">
                <div class="firstRow">
                    <div class="overwrite">
                    </div>
                </div>
                <div class="secondRow">
                    <div class="overwrite">
                    </div>
                </div>
                <div class="thirdRow">
                    <div class="overwrite">
                    </div>
                </div>
                <div class="fourthRow">
                    <div class="overwrite">
                    </div>
                </div>
                <div class="fifthRow">
                    <div class="overwrite">
                    </div>
                </div>
                <div class="sixthRow">
                    <div class="overwrite">
                    </div>
                </div>
                <div class="finalRow">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LeaveGame from "./LeaveGame"

    export default {
        name: 'NicknameCharacterBadGuys',
        components: {
            LeaveGame
        },
        computed: {
            nickname: function () {
                return this.$store.state.nickname
            },
            character: function () {
                return this.$store.getters.getCharacterFormatted
            },
            merlin: function () {
                return this.$store.state.PlayerInfo.merlin
            },
            isRegularGoodGuy: function () {
                return this.$store.getters.getCharacterFormatted === 'Knight of Arthur'
            },
            otherBadGuys: function () {
                return this.$store.state.badGuys.filter(bg => bg !== this.$store.state.nickname);
            },
            badGuysText: function () {
                return this.$store.state.character === "Merlin" ? "Minions of Mordred:" : "Other Minions of Mordred:"
            },
            isPercival: function () {
                return this.$store.state.character === "Percival"
            },
            isOberon: function () {
                return this.$store.state.character === "Oberon"
            },
            percivalEnabled: function() {
                return this.$store.state.config.percival;
            },
            oberonEnabled: function() {
                return this.$store.state.config.oberon;
            },
            morganaEnabled: function() {
                return this.$store.state.config.morgana;
            },
            mordredEnabled: function() {
                return this.$store.state.config.mordred;
            },
            shouldSeeBadGuys: function () {
                return !this.isRegularGoodGuy && !this.isPercival && !this.isOberon
            },
            openedEnvelope: function () {
                return this.$store.state.NicknameCharacterBadGuys.modalActive
            },
            modalActive: function () {
                return this.$store.state.NicknameCharacterBadGuys.modalActive
            }
        },
        methods: {
            toggleModalActive: function () {
                this.$store.state.NicknameCharacterBadGuys.modalActive = !this.$store.state.NicknameCharacterBadGuys.modalActive
            },
        }
    }
</script>

<style scoped>

    .redStamp {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 7px;
        height: 20px;
    }

    .openedEnvelope > .redStamp {
        display: none;
    }

    .overwrite {
        background: #f5ede4;
        height: 100%;
    }

    .openedEnvelope .overwrite {
        background: whitesmoke;
    }

    .envelopeContainer {
        width: 95%;
        margin: 0 auto;

    }

    .envelopeTop {
        width: calc(100% - 8px);
        margin: 0 auto;
        height: 5px;
        background: #f5ede4;
    }

    .openedEnvelope > .envelopeTop {
        background: whitesmoke;
    }

    .envelopeRowContainer {
        background: #f5ede4;
        border-left: #decab3 4px solid;
        border-right: #decab3 4px solid;
    }

    .firstRow {
        width: calc(100%);
        height: 4px;
        padding: 0px 6%;
        background: #decab3;
        margin: 0 auto;
    }

    .secondRow {
        width: 88%;
        height: 4px;
        background-color: #decab3;
        padding: 0px 10%;
        margin: 0 auto;
    }

    .thirdRow {
        width: 68%;
        height: 4px;
        background-color: #decab3;
        padding: 0px 10%;
        margin: 0 auto;
    }

    .fourthRow {
        width: 48%;
        height: 4px;
        background-color: #decab3;
        padding: 0px 10%;
        margin: 0 auto;
    }

    .fifthRow {
        width: 28%;
        height: 4px;
        background-color: #decab3;
        padding: 0px calc(14% - 10px);
        margin: 0 auto;
    }

    .sixthRow {
        width: 20px;
        height: 4px;
        background-color: #decab3;
        padding: 0px 10px;
        margin: 0 auto;
    }

    .finalRow {
        width: 100%;
        height: 11px;
        background-color: #f5ede4;
    }

    #nicknameCharacterBadGuys {
        overflow: visible;
    }

    /deep/ .leaveGame {
        max-width: 40%;
        margin: auto;
    }

    .permanentPlayerInfo {
        background-color: whitesmoke;
        font-size: 2em;
    }

    .fontSizing {
        font-size: 1.3em;
    }

    .modal-background {
        background: white;
        border-top: grey;
    }

    .playerInfoModal {
        color: #2f3026;
        position: fixed;
        right: calc(2.5% + 4px);
        left: calc(2.5% + 4px);
        bottom: 40px;
        width: calc(95% - 8px);

    }

    @media (min-width: 600px) {
        #toggleModalButton {
            width: 85%;
            left: 7.5%;
        }

        .is-active {
            bottom: 40px;
            width: 85%;
            left: 7.5%;
        }
    }
</style>
