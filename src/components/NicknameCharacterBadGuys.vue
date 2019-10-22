<template>
    <div id="displayPassFailVotes">
        <div class="modal" :class="{'is-active': modalActive === true}">
            <div class="modal-background is-centered"></div>
            <div class="modal-content permanentPlayerInfo is-centered">
                <div id="nickname" class="fontSizing">Nickname: {{ nickname }}</div>
                <div id="character" class="fontSizing">Role: {{ character }}</div>
                <div id="badGuys" v-if="!isRegularGoodGuy" class="fontSizing">
                    Bad guys:
                    <span v-for="(badGuy, index) in badGuys" :key="index">
                                {{badGuy}}
                            </span>
                </div>
            </div>
        </div>
        <div id="toggleModalButton" v-on:click="toggleModalActive">Toggle Player Information</div>
    </div>
</template>

<script>
    export default {
        name: 'NicknameCharacterBadGuys',
        props: ['badGuys'],
        data: () => {
            return {
                modalActive: false
            }
        },
        computed: {
            nickname: function () {
                return this.$store.getters.getNickname
            },
            character: function () {
                return this.$store.getters.getCharacter
            },
            isRegularGoodGuy: function () {
                return this.$store.getters.getCharacter === 'Good Guy'
            },
        },
        methods: {
            toggleModalActive: function () {
                this.modalActive = !this.modalActive
            }
        }
    }
</script>

<style scoped>
    .permanentPlayerInfo {
        font-size: 1em;
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
        /*position: fixed;*/
        bottom: 40px;
        width: 100%;
    }

    #toggleModalButton {
        /*position: fixed;*/
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
            /*position: fixed;*/
            bottom: 40px;
            width: 85%;
            left: 7.5%;
        }
    }
</style>