<template>
    <div id="assassinVote">

        <div class="modal" :class="{'is-active': modalActive === true}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <button @click="toggleModalActive">View Mission History</button>

                <img class="rolePictureAssassin" src="@/assets/assassinBig.png">

                <div id="assassin" v-if="!playerIsAssassin">
                    {{ assassinVoteData.assassin }} is attempting to assassinate Merlin.
                </div>

                <div v-if="playerIsAssassin">
                    <div id="assassin">{{ assassinVoteData.assassin }}, assassinate Merlin</div>

                    <form id="assassinVoteForm" @submit.prevent="submitAssassinGuess">
                        <div :key="index" v-for="(goodGuy, index) in assassinVoteData.goodGuys" class="lessPadding">
                            <label :class="{ selected: goodGuy === guess }">
                                <input id="goodGuy" type="radio" :value="goodGuy" v-model="guess"
                                       :disabled="!playerIsAssassin"/>{{ goodGuy }}
                            </label>
                        </div>

                        <input type="submit" class="button is-small" value="Submit Guess">
                    </form>
                </div>
            </div>
        </div>

        <div v-if="!modalActive && playerIsAssassin">
            <button @click="toggleModalActive">assassin vote</button>
        </div>

    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"

    export default {
        name: 'AssassinVote',
        data: function () {
            return {
                guess: "",
                modalActive: true
            }
        },
        props: ["assassinVoteData"],
        methods: {
            submitAssassinGuess: function () {
                console.log(this.guess)
                this.modalActive = !this.modalActive
                let assassinVoteMessage = {
                    event: 'AssassinVote',
                    guess: this.guess
                }
                WebsocketService.sendObj(this.$socket, assassinVoteMessage)
            },
            toggleModalActive: function () {
                this.modalActive = !this.modalActive
            },
        },
        computed: {
            playerIsAssassin: function () {
                return this.$store.getters.getNickname === this.assassinVoteData.assassin
            },
            noGuessSelected: function () {
                return this.guess === ""
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .modal {
        color: #C7383E;
    }

    input[type=radio] {
        display: none;
    }

    label {
        width: 67%;
        cursor: pointer;
        font-size: 1.5em;
        display: inline-block;
        margin-top: 3px;
        padding: 1px;
        background: #C7383E;
        color: lightgray;
    }

    .selected {
        background: darkred;
    }

    #assassin {
        font-size: 5em;
    }

    .somePadding {
        padding: 3em;
    }

    .lessPadding {
        padding: 1em;
    }

    img {
        padding: 3%;
    }

    button {
        margin-bottom: 5%;
    }
</style>