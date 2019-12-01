<template>
    <div id="nicknameCharacterBadGuys">
        <div class="modal" :class="{'is-active': modalActive === true}">
            <div class="modal-background is-centered"></div>
            <div class="modal-content permanentPlayerInfo is-centered">
                <LeaveGame class="leaveGame"/>

                <div id="nickname" class="fontSizing">Nickname: {{ nickname }}</div>
                <div id="character" class="fontSizing">Role: {{ character }}</div>
                <div id="badGuys" v-if="!isRegularGoodGuy" class="fontSizing">
                    {{badGuysText}}
                    <span v-for="(badGuy, index) in otherBadGuys" :key="index">
                        {{badGuy}}
                    </span>
                </div>
            </div>
        </div>
        <div id="toggleModalButton" v-on:click="toggleModalActive" class="is-size-5-mobile is-size-5-desktop">
            Player Information
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
        data: () => {
            return {
                modalActive: false
            }
        },
        computed: {
            nickname: function () {
                return this.$store.state.nickname
            },
            character: function () {
                return this.$store.getters.getCharacterFormatted
            },
            isRegularGoodGuy: function () {
                return this.$store.getters.getCharacterFormatted === 'Knight of Arthur'
            },
            otherBadGuys: function () {
                return this.$store.state.badGuys.filter(bg => bg !== this.$store.state.nickname);
            },
            badGuysText: function () {
                return this.$store.state.character === "Merlin" ? "Minions of Mordred:" : "Other Minions of Mordred:"
            }
        },
        methods: {
            toggleModalActive: function () {
                this.modalActive = !this.modalActive
            },
        }
    }
</script>

<style scoped>
    /deep/ .leaveGame {
        margin: 3%;
    }

    .permanentPlayerInfo {
        font-size: 2em;
    }

    .fontSizing {
        font-size: 1.3em;
    }

    .modal-background {
        background: lightgrey;
        border-top: grey;
    }

    .modal {
        position: absolute;
        width: 25%;
        top: initial;
    }

    .is-active {
        bottom: 40px;
        width: 100%;
    }

    #toggleModalButton {
        bottom: 0;
        left: 0;
        height: 40px;
        border: grey .5em solid;
        background: lightgrey;
        width: 100%;
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
