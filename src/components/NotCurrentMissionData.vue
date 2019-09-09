<template>
    <div id="notCurrentMissionData">
        <div v-if="questHasData">
            <h1>Mission History:</h1>
            <h3>These {{ activeQuestData.numberOfAdventurers }} went on the mission:</h3>
            <div v-for="(player, index) in activeQuestData.players" :key="index">
                <p>
                    {{player}}
                </p>
            </div>
            <div v-show="activeQuestData.pass">
                The mission was a success!
            </div>
            <div v-show="!activeQuestData.pass">
                The mission was a failure!
            </div>
            <div>
                {{ activeQuestData.votes }}
                There were {{ votesData['fail'] }} pass votes.
            </div>
            <div>
<!--                There were {{ activeQuestData.votes['fail'].length }} fail votes.-->
            </div>
        </div>
        <div v-else>
            This Quest hasn't happened yet!
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
</style>