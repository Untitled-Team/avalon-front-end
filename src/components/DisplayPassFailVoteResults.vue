<template>
    <div id="displayPassFailVotes">
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content container is-centered">
                <div class="bigText">Quest votes:</div>
                <div v-for="(passVote, index) in passVotes" :key="'pass' + index" class="vote pass is-centered"></div>
                <div v-for="(failVote, index) in failVotes" :key="'fail' + index" class="vote fail is-centered"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'DisplayPassFailVotes',
        props: ["passVotes", "failVotes"],
        created() {
            const sleep = (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            }

            const votesDisplayedMessage = {
                event: "QuestVotesDisplayed",
            }
            sleep(5000).then(() => {
                console.log('NOTTTT~!')
                WebsocketService.sendObj(this.$socket, votesDisplayedMessage)
            })
        }
    }
</script>

<style scoped>
    .vote {
        height: 12%;
        width: 50%;
        margin: 2em auto;
    }

    .pass {
        background: #04b004;
        opacity: 1;
    }

    .fail {
        background: #b00404;
        opacity: 1;
    }

    .modal-content {
        height: 100%;
        background: black;
        opacity: .7;
        text-align: center;
    }

    .bigText {
        color: white;
    }

    modal-background {
        background: black;
        opacity: 1 !important;
    }
</style>