<template>
    <div id="notCurrentMissionData" v-bind:class="{passed: isPassed, failed: isFailed, notCompleted: !questHasData}">
        <div class="missionHistory" v-if="questHasData">

            <div class="success" v-if="activeQuestData.pass">
                <img class="victoryText" src="@/assets/victoryTextBig.png"/>
                <img class="flag" src="@/assets/flagBig.png"/>

                <div class="missionParty">
                    Mission Party:
                    <div v-for="(player, index) in activeQuestData.players" :key="index">
                        <p>
                            {{player}}
                        </p>
                    </div>
                </div>
            </div>

            <div class="failure" v-else>
                <img class="defeatText" src="@/assets/defeatTextBig.png"/>
                <img class="dagger" src="@/assets/daggerBig.png"/>

                <div class="missionParty">
                    Mission Party:
                    <div v-for="(player, index) in activeQuestData.players" :key="index">
                        <p>
                            {{player}}
                        </p>
                    </div>
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
        /*height: 100%;*/
        color: whitesmoke;
        display: flex;
        flex: 1 1 0;
    }

    .missionHistory {
        height: calc(100% - 40px);
    }

    .failure {
        display: flex;
        flex-direction: column;
        align-items: center;

        .defeatText {
            flex-shrink: 1;
            flex-grow: 1;
            min-height: 0;
            min-width: 0;
            max-width: 60%;
        }

        .dagger {
            flex-shrink: 1;
            flex-grow: 1;
            min-width: 0;
            min-height: 0;
            max-width: 70%;
            margin-left: 30%;
            margin-top: 5%;
        }

        .missionParty {
            margin-top: 5%;
            flex-shrink: 1;
            flex-grow: 1;
            font-size: 2em;
        }
    }

    .success {
        display: flex;
        flex-direction: column;
        align-items: center;

        .victoryText {
            flex-shrink: 1;
            flex-grow: 1;
            min-height: 0;
            min-width: 0;
            max-width: 60%;
        }

        .flag {
            flex-shrink: 1;
            flex-grow: 1;
            min-width: 0;
            min-height: 0;
            max-width: 60%;
        }

        .missionParty {
            margin-top: 5%;
            flex-shrink: 1;
            flex-grow: 1;
            font-size: 2em;
        }
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
