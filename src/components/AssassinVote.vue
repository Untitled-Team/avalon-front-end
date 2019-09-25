<template>
    <div id="assassinVote">
        <div class="mediumText">The good guys have passed 3 missions, but it's not over yet!</div>
        <div id="assassin" class="bigText">{{ assassinVoteData.assassin }}, Guess Merlin</div>

        <form id="assassinVoteForm" @submit.prevent="submitAssassinGuess">
            <div :key="index" v-for="(goodGuy, index) in assassinVoteData.goodGuys" class="lessPadding">
                <label :class="{ selected: goodGuy === guess }">
                    <input id="goodGuy" type="radio" :value="goodGuy" v-model="guess" :disabled="!playerIsAssassin"/>{{ goodGuy }}
                </label>
            </div>

            <div v-show="playerIsAssassin && !noGuessSelected" class="somePadding">
                <input type="submit" class="button is-small" value="Submit Guess">
            </div>
        </form>

    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

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

<style scoped>
    input[type=radio] {
        display: none;
    }

    label {
        width: 20rem;
        cursor: pointer;
        font-size: 1.5em;
        display: inline-block;
        margin: auto .2em;
        border: .5px ridge #3d3c5c;
        border-radius: 12px;
        box-shadow: 3px 3px #3d3c5c;
    }

    .selected {
        background: #b0912a;
    }

    .somePadding {
        padding: 3em;
    }

    .lessPadding {
        padding: 1em;
    }
</style>