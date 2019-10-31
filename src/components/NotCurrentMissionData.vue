<template>
    <div id="notCurrentMissionData" v-bind:class="{passed: isPassed, failed: isFailed, notCompleted: !questHasData}">
        <div class="missionHistory" v-if="questHasData">

            <div class="success" v-if="activeQuestData.pass">
                <img class="victoryText" src="@/assets/victoryTextBig.png"/>
                <img class="flag" src="@/assets/flagBig.png"/>
            </div>

            <div class="failure" v-else>
                <img class="defeatText" src="@/assets/defeatTextBig.png"/>
                <img class="dagger" src="@/assets/daggerBig.png"/>
            </div>

            <div class="missionParty">
                Mission Party:
                <div v-for="(player, index) in activeQuestData.players" :key="index">
                    <p>
                        {{player}}
                    </p>
                </div>
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
        }
    }
</script>


<style lang="scss" scoped>
    @import "../styles/variables";

    #notCurrentMissionData {
        height: 100%;
    }

    .missionHistory {
        height: 100%;
    }

    .failure {
        height: 55%;

        .defeatText {
            height: 25%;
            width: auto;
        }

        .dagger {
            width: 75%;
            margin-left: 22%;
            margin-top: 5%;
        }
    }

    .success {
        height: 55%;

        .victoryText {
            height: 25%;
            width: auto;
        }

        .flag {
            margin-top: 5%;
        }
    }

    .missionParty {
        margin-top: 5%;
        height: 25%;
        font-size: 3vh;
    }

    .passed {
        background: $successful;
        color: #F6F3FA;
    }

    .failed {
        background: $failed;
        color: #F6F3FA;
    }

    .notCompleted {
        font-size: 5em;
        background: $incomplete;
    }
</style>
