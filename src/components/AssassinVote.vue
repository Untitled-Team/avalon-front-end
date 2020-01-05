<template>
    <div id="assassinVote">

        <div class="modal" :class="{'is-active': modalActive === true}">
            <div class="modal-background"></div>
            <div class="modal-content containAll">
                <div class="assassinImageWrapper">
                    <img class="rolePictureAssassin" src="@/assets/assassinBig.png">
                </div>


                <div id="everyoneElse" v-if="!playerIsAssassin">
                    {{ assassinVoteData.assassin }} is trying to assassinate Merlin...
                </div>

                <div v-if="playerIsAssassin" class="assassinContainerStuff">
                    <div id="assassin">{{ assassinVoteData.assassin }}, assassinate Merlin</div>

                    <div :key="index" v-for="(goodGuy, index) in assassinVoteData.goodGuys" class="lessPadding">
                        <label :class="{ selected: goodGuy === guess }">
                            <input id="goodGuy" type="radio" :value="goodGuy" v-model="guess"
                                   :disabled="!playerIsAssassin"/>{{ goodGuy }}
                        </label>
                    </div>

                    <img @click="submitAssassinGuess" class="assassinateButton" src="@/assets/assassinateButton.png">
                </div>
            </div>
        </div>

        <button class="toggleAssassinVoteScreenButton" @click="toggleModalActive">{{ toggleAssassinVoteScreenButtonText
            }}
        </button>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"

    export default {
        name: 'AssassinVote',
        data: function () {
            return {
                guess: "",
                modalActive: true,
                toggleAssassinVoteScreenButtonText: 'Review Quests'
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
                if (this.modalActive) {
                    this.toggleAssassinVoteScreenButtonText = 'Review Quests'
                } else {
                    this.toggleAssassinVoteScreenButtonText = 'Return to Vote'
                }
            },
        },
        computed: {
            playerIsAssassin: function () {
                return this.$store.getters.getNickname === this.assassinVoteData.assassin
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

    .assassinateButtonImage {
        height: 40px;
        margin: 0 auto;
    }

    .assassinateButton {
        display: flex;
        margin: 0 auto;
        margin-top: 3%;
        flex-direction: column;
        background-color: inherit;
        border: 0;
    }

    .toggleAssassinVoteScreenButton {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 40px;
        background: #b32a39;
        width: 100%;
        z-index: 99999999999999;
        color: ghostwhite;
        font-size: 3em;
        font-family: inherit;
        border: 2px solid tomato;
    }

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

    .assassinContainerStuff {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
    }

    #assassinVoteForm {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
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
        color: #b32a39;
    }

    input[type=radio] {
        display: none;
    }

    label {
        width: 62%;
        max-width: 250px;
        cursor: pointer;
        font-size: 2.5em;
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
        font-size: 3em;
        padding-bottom: 5px;
        margin-bottom: 3%;
    }

    #everyoneElse {
        font-size: 3em;
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
