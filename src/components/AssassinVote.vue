<template>
    <div id="assassinVote">
        <div class="mediumText">The good guys have passed 3 missions, but it's not over yet!</div>
        <div class="bigText">{{assassinVoteData.assassin }}, Guess Merlin</div>
        <div :key="index" v-for="(goodGuy, index) in assassinVoteData.goodGuys">
            <label :class="{ selected: goodGuy === guess }">
                <input type="radio" :value="goodGuy" v-model="guess" :disabled="!playerIsAssassin"/>{{ goodGuy }}
            </label>
        </div>
        <input type="button" class="button is-small" v-on:click="submitAssassinGuess" :disabled="noGuessSelected"
               value="Submit Guess">
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'AssassinVote',
        data: function () {
            return {
                guess: null
            }
        },
        props: ["assassinVoteData"],
        methods: {
            submitAssassinGuess: function () {
                this.$socket.sendObj({
                    event: 'AssassinVote',
                    guess: this.guess
                })
            }
        },
        computed: {
            playerIsAssassin: function () {
                return store.getters.getNickname
            },
            noGuessSelected: function () {
                return this.guess === null
            },
            isMerlinGuess: function () {
                return
            }
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
</style>