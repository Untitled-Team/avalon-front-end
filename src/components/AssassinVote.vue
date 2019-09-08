<template>
    <div id="assassinVote">
        The good guys have passed 3 missions, but it's not over yet!
        {{assassinVoteData.assassin }}, GuESs MeRLin
        <ul>
            <li :key="goodGuy" v-for="goodGuy in assassinVoteData.goodGuys">
                <input type="radio" :value="goodGuy" v-model="merlinGuess" :disabled="!playerIsAssassin"/>
                {{ goodGuy }}
            </li>
        </ul>
        <input type="button" class="button" v-on:click="submitAssassinGuess" :disabled="noGuessSelected" value="Submit Guess">
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'AssassinVote',
        data: function() {
            return {
                merlinGuess: null
            }
        },
        props: ["assassinVoteData"],
        methods: {
            submitAssassinGuess: function () {
                this.$socket.sendObj({
                    event: 'submitAssassinGuess',
                    guess: this.merlinGuess
                })
            }
        },
        computed: {
            playerIsAssassin: function () {
                return store.getters.getNickname
            },
            noGuessSelected: function () {
                return this.merlinGuess === null

            },
        }
    }
</script>

<style scoped>
</style>