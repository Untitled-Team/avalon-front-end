<template>
    <div id="assassinVote">

        <div class="modal is-active"><!-- :class="{'is-active': modalActive === true}">-->
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="mediumText">The good guys have passed 3 missions, but it's not over yet!</div>
                <div id="assassin" class="bigText">{{ assassinVoteData.assassin }}, Guess Merlin</div>

                <form id="assassinVoteForm" @submit.prevent="submitAssassinGuess">
                    <div :key="index" v-for="(goodGuy, index) in assassinVoteData.goodGuys" class="lessPadding">
                        <label :class="{ selected: goodGuy === guess }">
                            <input id="goodGuy" type="radio" :value="goodGuy" v-model="guess"
                                   :disabled="!playerIsAssassin"/>{{ goodGuy }}
                        </label>
                    </div>

                    <div v-show="playerIsAssassin && !noGuessSelected" class="somePadding">
                        <input type="submit" class="button is-small" value="Submit Guess">
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"

    export default {
        name: 'AssassinVote',
        data: function () {
            return {
                guess: ""
            }
        },
        props: ["assassinVoteData"],
        methods: {
            submitAssassinGuess: function () {
                let assassinVoteMessage = {
                    event: 'AssassinVote',
                    guess: this.guess
                }
                WebsocketService.sendObj(this.$socket, assassinVoteMessage)
            }
        },
        computed: {
            playerIsAssassin: function () {
                return this.$store.getters.getNickname === this.assassinVoteData.assassin
            },
            noGuessSelected: function () {
                return this.guess === ""
            },
        }
    }
</script>

<style lang="scss" scoped>

    #assassinVoteForm {
        color:white;
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
        background: grey;
    }

    .selected {
        background: rgba(whitesmoke, 0.35);
    }

    .somePadding {
        padding: 3em;
    }

    .lessPadding {
        padding: 1em;
    }
</style>