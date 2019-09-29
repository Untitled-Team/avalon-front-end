<template>
    <div id="notCurrentMissionData" class="section"
         v-bind:class="{passed: isPassed, failed: isFailed, notCompleted: !questHasData}">
        <div id="missionHistory" v-if="questHasData">
            <div class="bigText">Mission History:</div>
            <div id="numberOfAdventurers" class="mediumText">These {{ activeQuestData.numberOfAdventurers }} went on the
                mission:
            </div>
            <div v-for="(player, index) in activeQuestData.players" :key="index">
                <p>
                    {{player}}
                </p>
            </div>
            <div id="success" class="bigText" v-if="activeQuestData.pass">
                The quest was a success!
            </div>
            <h1 id="failure" class="bigText" v-else>
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
        <div id="NoQuestData" v-if="!questHasData">
            This quest hasn't happened yet!
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotCurrentMissionData',
        props: ["activeQuestData"],
        computed: {
            isPassed: function () {
                return this.activeQuestData.pass === true
            },
            isFailed: function () {
                return this.activeQuestData.pass === false
            },
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
        height: 100%;
        margin-top: 1000px;
    }

    .partyVote {
        border: 1px solid #bbb;
        margin-top: .4em;
    }

    .passed {
        background: #6EC0EC;
        color: #F6F3FA;
    }

    .failed {
        background: #E94646;
        color: #F6F3FA;
    }
</style>
