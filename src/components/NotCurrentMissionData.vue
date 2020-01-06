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
                    Mission Leader: {{ activeQuestMissionLeader }}
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
                    Mission Leader: {{ activeQuestMissionLeader }}
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

        <NicknameCharacterBadGuys/>
    </div>
</template>

<script>
    import NicknameCharacterBadGuys from "../components/NicknameCharacterBadGuys";

    export default {
        name: 'NotCurrentMissionData',
        components: {
            NicknameCharacterBadGuys
        },
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
            activeQuestMissionLeader: function () {
                let lastMissionIndex = this.activeQuestData.votes.length - 1
                return this.activeQuestData.votes[lastMissionIndex].missionLeader
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    #NoQuestData {
        font-size: 1.5rem;
        margin-left: 5%;
        margin-right: 5%;
        display: flex;
        flex: 1 1 0;
    }

    #notCurrentMissionData {
        color: whitesmoke;
        display: flex;
        flex: 1 1 0;

            flex-direction: column;
            /*flex-grow: 1;*/
            /*background: #848484;*/
    }

    .missionHistory {
        display: flex;
        flex: 1 1 0;
    }

    .failure {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        align-items: center;

        .defeat {
            display: flex;
            flex: 1 1 0;
            margin-left: 5px;
            margin-right: 5px;
            height: 0;

            .defeatText {
                object-fit: contain;
            }
        }

        .daggerWrapper {
            margin-top: 5px;
            display: flex;
            flex: 2 1 auto;
            margin-left: 40%;
            margin-right: 5px;
            height: 0;

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
        flex-grow: 1;
        flex-direction: column;
        align-items: center;

        .victory {
            margin-top: 4px;
            display: flex;
            flex: 1 1 auto;
            margin-left: 5px;
            margin-right: 5px;
            height: 0;

            .victoryText {
                object-fit: contain;
            }
        }

        .flagWrapper {
            display: flex;
            flex: 2 1 auto;
            margin-left: 20%;
            margin-right: 5%;
            height: 0;

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
        /*font-size: 5em;*/
        background: $incomplete;
    }
</style>
