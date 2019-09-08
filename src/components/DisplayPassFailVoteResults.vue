<template>
    <div id="displayPassFailVotes">
        <div v-for="passVote in passVotes" :key="passVote" class="vote pass">PASS</div>
        <div v-for="failVote in failVotes" :key="failVote" class="vote fail">FAIL :p haha</div>
    </div>
</template>

<script>
    export default {
        name: 'DisplayPassFailVotes',
        props: ["passVotes", "failVotes"],
        created() {
            const sleep = (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            }
            sleep(5000).then(() => {
                this.$socket.sendObj({
                    action: "QuestVotesDisplayed",
                })
            })
        }
    }
</script>

<style scoped>
    .vote {
        height: 100px;
        width: 250px;
        margin: auto;
        padding: 5px;
    }

    .pass {
        background: green;
    }

    .fail {
        background: red;
    }
</style>