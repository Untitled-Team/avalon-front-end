<template>
    <div id="notCurrentMissionData" class="section">
        <div v-if="questHasData">
            <div class="bigText">Mission History:</div>
            <div class="mediumText">These {{ activeQuestData.numberOfAdventurers }} went on the mission:</div>
            <div v-for="(player, index) in activeQuestData.players" :key="index">
                <p>
                    {{player}}
                </p>
            </div>
            <div class="bigText" v-show="activeQuestData.pass">
                The quest was a success!
            </div>
            <h1 class="bigText" v-show="!activeQuestData.pass">
                The quest was a failure!
            </h1>
            <div class="columns is-mobile">
                <div class="column is-one-fifth"></div>
                <div class="column is-three-fifths">
                    <div class="partyVote somePadding" :key="index" v-for="(partyVote, index) in votesData">
                        <div>Party vote {{ index+1 }} of {{ votesData.length }}:</div>
                        <div>There were {{ partyVote.successVotes.length }} votes to approve the party</div>
                        <div>There were {{ partyVote.failVotes.length }} votes to deny the party</div>
                    </div>
                </div>
                <div class="column is-one-fifth"></div>
            </div>
        </div>
        <div v-else>
            This quest hasn't happened yet!
        </div>
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'NotCurrentMissionData',
        props: ["activeQuestData"],
        computed: {
            questHasData: function () {
                return this.activeQuestData.pass !== null
            },
            votesData: function () {
                return this.activeQuestData.votes
            }
        }
    }
</script>


<style scoped>
    #notCurrentMissionData {
        padding: 20px;
    }

    .partyVote {
        border: 1px solid #bbb;
        margin-top: .4em;
    }
</style>