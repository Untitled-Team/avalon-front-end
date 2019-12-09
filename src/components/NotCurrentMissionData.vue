<template>
    <div id="notCurrentMissionData" v-bind:class="{passed: isPassed, failed: isFailed, notCompleted: !questHasData}">
        <div class="missionHistory" v-if="questHasData">

            <div class="success" v-if="activeQuestData.pass">
                <div class="victory">
                    <img class="victoryText" src="@/assets/victoryTextBig.png"/>
                </div>
                <div class="flagWrapper">
                    <img class="flag" src="@/assets/flagBig.png"/>
                </div>

                <div class="missionLeader">
                    Mission Leader: {{ activeQuestData.votes[0].missionLeader }}
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

            <div class="failure" v-else>
                <div class="defeat">
                    <img class="defeatText" src="@/assets/defeatTextBig.png"/>
                </div>

                <div class="daggerWrapper">
                    <img class="dagger" src="@/assets/daggerBig.png"/>
                </div>

                <div class="missionLeader">
                    Mission Leader: {{ activeQuestData.votes[0].missionLeader }}
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

        </div>
        <div id="NoQuestData" v-if="!questHasData">
            This quest hasn't happened yet!
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotCurrentMissionData',
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
            activeQuestData: function () {
                return this.$store.state.missions[this.$store.state.activeMission - 1]
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    #NoQuestData {
        font-size: 2rem;
        margin-left: 5%;
        margin-right: 5%;
    }

    #notCurrentMissionData {
        color: whitesmoke;
        display: flex;
        flex: 1 1 0;
    }

    .missionHistory {
        display: flex;
        flex: 1 1 0;
    }

    .failure {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        align-items: center;

        .defeat {
            display: flex;
            flex: 1 1 0;
            margin-left: 5px;
            margin-right: 5px;

            .defeatText {
                object-fit: contain;
            }
        }

        .daggerWrapper {
            margin-top: 5px;
            display: flex;
            flex: 2 1 0;
            margin-left: 40%;
            margin-right: 5px;

            .dagger {
                object-fit: contain;
            }
        }

        .missionLeader {
            padding-top: 5px;
            font-size: 3em;
        }

        .missionParty {
            margin-top: 2px;
            margin-bottom: 5px;
            flex-shrink: 1;
            font-size: 2em;
        }
    }

    .success {
        display: flex;
        flex-direction: column;
        align-items: center;

        .victory {
            margin-top: 4px;
            display: flex;
            flex: 1 1 0;
            margin-left: 5px;
            margin-right: 5px;

            .victoryText {
                object-fit: contain;
            }
        }

        .flagWrapper {
            display: flex;
            flex: 2 1 0;
            margin-left: 20%;
            margin-right: 5%;

            .flag {
                object-fit: contain;
            }
        }

        .missionLeader {
            padding-top: 5px;
            font-size: 2.5em;
        }

        .missionParty {
            margin-top: 2px;
            margin-bottom: 5px;
            font-size: 2.2em;
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
