<template>
    <div class="questWrapper container is-paddingless"
         v-on:click="makeActive"
         v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
        <div class="hapticfeedback" v-bind:class="{active: isActive}">
            <div class="partySize biggerText is-size-1-mobile"
                 v-bind:class="{current: isCurrent, first: isFirst, middle: isMiddle, last: isLast, active: isActive}">
                <p class="numberOfPlayers" v-bind:class="{active: isActive}">{{ quest.numberOfAdventurers }}</p>
            </div>
        </div>
        <div class="bannerContainer" :class="{
             activeIsIncompleteAndActiveNotCurrent: activeIsIncompleteAndActiveNotCurrent,
             activeIsIncompleteAndActiveIsCurrent: activeIsIncompleteAndActiveIsCurrent,
             activeMissionPassing: activeMissionPassing,
             activeMissionFailing: activeMissionFailing,
             isFirstQuest: isFirst,
             isLastQuest: isLast,
         }">
            <div class="firstRow" :class="{first: isFirst, middle: isMiddle, last: isLast}">
                <div class="overwrite"
                     v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed, current: isCurrent}">
                </div>
            </div>
            <div class="secondRow">
                <div class="overwrite"
                     v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed, current: isCurrent}">
                </div>
            </div>
            <div class="thirdRow">
                <div class="overwrite"
                     v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed, current: isCurrent}">
                </div>
            </div>
            <div class="fourthRow">
                <div class="overwrite"
                     v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed, current: isCurrent}">
                </div>
            </div>
            <div class="fifthRow">
                <div class="overwrite"
                     v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed, current: isCurrent}">
                </div>
            </div>
            <div class="sixthRow">
                <div class="overwrite"
                     v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed, current: isCurrent}">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Quest',
        props: ["quest", "missionNumber", "quests"],
        methods: {
            makeActive: function () {
                this.$store.state.activeMission = this.missionNumber
            }
        },
        computed: {
            activeIsIncompleteAndActiveNotCurrent: function () {
                return this.quests[this.$store.state.activeMission - 1].pass === null && this.$store.state.activeMission !== this.$store.state.currentMission
            },
            activeIsIncompleteAndActiveIsCurrent: function () {
                return this.quests[this.$store.state.activeMission - 1].pass === null && this.$store.state.activeMission === this.$store.state.currentMission
            },
            didPass: function () {
                return this.quest.pass === true
            },
            didFail: function () {
                return this.quest.pass === false
            },
            completed: function () {
                return this.quest.pass !== null
            },
            isActive: function () {
                return this.missionNumber === this.$store.state.activeMission
            },
            isCurrent: function () {
                return this.missionNumber === this.$store.state.currentMission
            },
            isFirst: function () {
                return this.missionNumber === 1
            },
            isMiddle: function () {
                return this.missionNumber !== 1 && this.missionNumber !== 5
            },
            isLast: function () {
                return this.missionNumber === 5
            },
            activeMissionPassing: function () {
                return this.quests[this.$store.state.activeMission - 1].pass === true
            },
            activeMissionFailing: function () {
                return this.quests[this.$store.state.activeMission - 1].pass === false
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .activeIsIncompleteAndActiveNotCurrent {
        background: $incomplete
    }

    .activeIsIncompleteAndActiveIsCurrent {
        background: $current;
    }

    .questWrapper {
        -webkit-tap-highlight-color: transparent;
        outline-style: none;
    }

    .numberOfPlayers {
        margin-left: 5px;
        margin-top: 5px;
        color: $bannerOutline;
    }

    .numberOfPlayers.active {
        margin-top: 12px;
    }

    .hapticfeedback {
        height: 12.5vh;
        min-height: 90px;
        display: flex;
        justify-content: center;
    }

    .partySize {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .questWrapper.active.notCompleted {
        background: $incomplete;
    }

    .bannerContainer {
        padding-left: 2px;
        padding-right: 2px;
        bottom: 0px;
        height: 32px;
    }

    .isFirstQuest {
        padding-left: 0px;
    }

    .isLastQuest {
        padding-right: 0px;
    }

    .bannerContainer.first {
        padding-left: 0px;
    }

    .bannerContainer.last {
        padding-right: 0px;
    }

    .activeMissionPassing {
        background: $successful;
    }

    .activeMissionFailing {
        background: $failed;
    }

    .activeMissionIncomplete {
        background: $incomplete;
    }

    .partySize.first {
        border-left: none;
        border-right: 2px solid $bannerOutline;
    }

    .partySize.middle {
        border-right: 2px solid $bannerOutline;
        border-left: 2px solid $bannerOutline;
    }

    .partySize.last {
        border-right: none;
        border-left: 2px solid $bannerOutline;
    }

    .overwrite {
        background: $incomplete;
        height: 100%;
        margin: 0 auto;
    }

    .active > .bannerContainer > .firstRow {
        width: 100%;
        height: 4px;
        padding: 0px 5%;
        margin: 0 auto;
    }

    .bannerContainer {
        .first {
            box-shadow: 2px 0px rgba(black, 0.3);
            /*padding-left: 0px;*/
        }

        .middle {
            box-shadow: -2px 0px rgba(black, 0.3), 2px 0px rgba(black, 0.3);
        }

        .last {
            box-shadow: -2px 0px rgba(black, 0.3);
        }
    }

    .inactive > .bannerContainer > .firstRow {
        width: 100%;
        height: 4px;
        padding: 0px 5%;
        background: $bannerOutline;
        margin: 0 auto;
        box-shadow: 0px 4px rgba(black, 0.3), -2px 0px rgba(black, 0.3), 2px 0px rgba(black, 0.3);
    }

    .inactive > .bannerContainer > .secondRow {
        width: 90%;
        height: 4px;
        box-shadow: 0px 4px rgba(black, 0.3);
        padding: 0px 5%;
        background: $bannerOutline;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .thirdRow {
        width: 80%;
        height: 4px;
        box-shadow: 0px 4px rgba(black, 0.3);
        padding: 0px 10%;
        background: $bannerOutline;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .fourthRow {
        width: 60%;
        height: 4px;
        box-shadow: 0px 4px rgba(black, 0.3);
        padding: 0px 10%;
        background: $bannerOutline;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .fifthRow {
        width: 40%;
        height: 4px;
        box-shadow: 0px 4px rgba(black, 0.3);
        padding: 0px 17.5%;
        background: $bannerOutline;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .sixthRow {
        width: 5%;
        height: 4px;
        box-shadow: 0px 4px rgba(black, 0.3);
        padding: 0px 3%;
        background: $bannerOutline;
        margin: 0 auto;
    }

    .section {
        padding-top: 3rem;
        padding-right: 1.5rem;
        padding-bottom: 0rem;
        padding-left: 1.5rem;
    }

    .passOrFail {
        margin-bottom: 10px;
        text-align: center;
        margin-right: auto;
        margin-left: auto;
        border-radius: 50%;
        background: $incomplete;
        height: 20px;
        width: 20px;
    }

    .partySize {
        color: whitesmoke;
    }

    .current {
        background: $current;
    }

    .passing:not(.active) {
        background: $successful;
    }

    .passing.active {
        background: $successful;
    }

    .failing:not(.active) {
        background: $failed;
    }

    .failing.active {
        background: $failed;
    }

    @media (max-height: 472px) {
        .hapticfeedback {
            min-height: 70px;
        }
    }
</style>
