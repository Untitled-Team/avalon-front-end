<template>
    <div id="displayPassFailVotes">
        <div class="modal" :class="{'is-active': modalActive === true}">
            <div class="modal-background is-centered">
                <div class="permanentPlayerInfo is-centered">
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
        </div>
        <div id="toggleModal" v-on:click="toggleModalActive">Toggle Player Information</div>
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
                console.log(this.$store.getters.getCharacter)
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
        background: #b0912a;
    }

    .modal {
        height: 25%;
        width: 25%;
    }

    .is-active {
position: fixed;
        top: 37.5%;
        left: 37.5%;
    }

    #toggleModal {
        width: 100%;
        border: #04b004 .5em solid;
        background: turquoise;
    }
</style>