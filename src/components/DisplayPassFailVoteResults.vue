<template>
    <div id="displayPassFailVotes">
        <div v-for="(passVote, index) in passVotes" :key="'pass' + index" class="vote pass is-centered"></div>
        <div v-for="(failVote, index) in failVotes" :key="'fail' + index" class="vote fail is-centered"></div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";
    import store from "../store/index.js"

    export default {
        name: 'DisplayPassFailVotes',
        computed: {
            passVotes: function () {
                return store.state.DisplayPassFailVoteResults.passVotes
            },
            failVotes: function () {
                return store.state.DisplayPassFailVoteResults.failVotes
            },
        },
        created() {
            const sleep = (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            }
            const votesDisplayedMessage = {
                event: "QuestVotesDisplayed",
            }

            sleep(5000).then(() => {
                WebsocketService.sendObj(this.$socket, votesDisplayedMessage)
            })
        }
    }
</script>

<style scoped>
    .vote {
        display: flex;
        flex: 1 1 0;
        border-top: 5px solid #2f3026;
    }

    .pass {
        background: #04b004;
        opacity: 1;
    }

    .fail {
        background: #b00404;
        opacity: 1;
    }

    modal-background {
        background: black;
        opacity: 1 !important;
    }

    #displayPassFailVotes {
        background-color: #2f3026;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
</style>