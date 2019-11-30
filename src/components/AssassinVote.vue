<template>
    <div id="assassinVote">

        <div class="modal" :class="{'is-active': modalActive === true}">
            <div class="modal-background"></div>
            <div class="modal-content containAll">
                <div class="viewMissionsButtonWrapper">
                    <button class="viewMissionButton" @click="toggleModalActive">View Mission History</button>
                </div>

                <div class="assassinImageWrapper">
                    <img class="rolePictureAssassin" src="@/assets/assassinBig.png">
                </div>


                <div id="everyoneElse" v-if="!playerIsAssassin">
                    {{ assassinVoteData.assassin }} is trying to assassinate Merlin...
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

        <div v-if="!modalActive && playerIsAssassin"
             :class="{successful: activeIsPassed, failed: activeIsFailed, incomplete: !activeQuestHasData}">
            <button @click="toggleModalActive">replace me w/ a cool new pixel button</button>
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
        methods: {
            submitAssassinGuess: function () {
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
            activeIsPassed: function () {
                return this.activeQuestData.pass === true
            },
            activeIsFailed: function () {
                return this.activeQuestData.pass === false
            },
            activeQuestHasData: function () {
                return this.activeQuestData.pass !== null
            },
            activeQuestData: function () {
                return this.$store.state.missions[this.$store.state.activeMission - 1]
            },
            assassinVoteData: function () {
                return this.$store.state.assassinVote.assassinVoteData
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .modal {
        //puts this in front of the player info modal
        z-index: 1000;
    }

    .modal-background {
        background-color: rgba(10, 10, 10, 1);
    }

    .viewMissionsButtonWrapper {
        margin: 0 auto;
        padding-bottom: 10px;
    }

    .containAll {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
    }

    .assassinImageWrapper {
        justify-content: center;
        width: 75%;
        margin: 0 auto;

        img {
            object-fit: contain;
        }
    }

    .playerIsAssassin {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .viewMissionButton {
        display: flex;
    }

    .modal {
        position: absolute;
        color: #C7383E;
    }

    input[type=radio] {
        display: none;
    }

    label {
        width: 58%;
        max-width: 250px;
        cursor: pointer;
        font-size: 2.25em;
        display: inline-block;
        margin-bottom: 5px;
        padding: 2px;
        background: #C7383E;
        color: lightgray;
    }

    .selected {
        background: darkred;
    }

    #assassin {
        font-size: 4em;
        padding-bottom: 5px;
    }

    #everyoneElse {
        font-size: 4em;
        width: 90%;
        margin: 0 auto;
    }

    .somePadding {
        padding: 3em;
    }

    input[type=submit] {
        font-family: inherit;
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 0;
        border: whitesmoke solid 1px;
        appearance: none;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 0px;
        padding-bottom: 0px;
        height: 1.8em;
        font-size: 2em;
        background: whitesmoke;
        color: #2f3026;
    }

    .successful {
        background: $successful;
    }

    .failed {
        background: $failed;
    }

    .incomplete {
        background: $incomplete;
    }

    .current {
        background: $current;
    }

    @media (max-height: 1500px) {


    }

    @media (max-height: 1000px) {

    }

    @media (max-height: 700px) {

    }

    @media (max-height: 553px) {


    }

    @media (max-height: 472px) {
        .assassinImageWrapper {
            display: none;
        }

    }
</style>