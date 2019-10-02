<template>
    <div class="questWrapper container is-paddingless"
         v-on:click="makeActive"
         v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
        <div class="hapticfeedback" v-bind:class="{active: isActive}">
        <div class="partySize biggerText is-size-1-mobile" v-bind:class="{current: isCurrent, first: isFirst, middle: isMiddle, last: isLast, active: isActive}">
            <p class="numberOfPlayers">{{ quest.numberOfAdventurers }}</p>
        </div>
        </div>
        <div class="bannerContainer"
             v-bind:class="{activeMissionPassing: activeMissionPassing, activeMissionFailing: activeMissionFailing, activeMissionIncomplete: activeMissionIncomplete, last: isLast, first: isFirst}">
            <div class="firstRow">
                <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
                </div>
            </div>
            <div class="secondRow">
                <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
                </div>
            </div>
            <div class="thirdRow">
                <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
                </div>
            </div>
            <div class="fourthRow">
                <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
                </div>
            </div>
            <div class="fifthRow">
                <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
                </div>
            </div>
            <div class="sixthRow">
                <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store/index.js"

export default {
    name: 'Quest',
    props: ["quest", "missionNumber", "quests"],
    methods: {
        makeActive: function () {
            store.state.activeMission = this.missionNumber
        }
    },
    computed: {
        didPass: function () {
            return this.quest.pass === true
        },
        didFail: function () {
            return this.quest.pass === false
        },
        completed: function() {
            return this.quest.pass !== null
        },
        isActive: function () {
            return this.missionNumber === store.state.activeMission
        },
        isCurrent: function () {
            return this.missionNumber === store.state.currentMission
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
        activeMissionPassing: function() {
            return this.quests[store.state.activeMission - 1].pass === true
        },
        activeMissionFailing: function() {
            return this.quests[store.state.activeMission - 1].pass === false
        },
        activeMissionIncomplete: function() {
            return this.quests[store.state.activeMission - 1].pass === null
        },

        // focusedMission: function() {
        //     return {
        //         active: isActive,
        //         inactive: !isActive,
        //         passing: didPass,
        //         failing: didFail,
        //         notCompleted: !completed
        //     }
        // },
    }
}
</script>

<style scoped>
    .numberOfPlayers {
        margin-left: 5px;
        margin-top: 5px;
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
        /*margin: 0 auto;*/
    }

    .questWrapper.active.notCompleted {
        background: #5B585F;
    }

    .bannerContainer {
        padding-left: 2px;
        padding-right: 2px;
        bottom: 0px;
        height: 32px;
    }

    .bannerContainer.first {
        padding-left: 0px;
    }

    .bannerContainer.last {
        padding-right: 0px;
    }

    .activeMissionPassing {
        background: #6EC0EC;
    }

    .activeMissionFailing {
        background: #E94646;
    }

    .activeMissionIncomplete {
        background: #5B585F;
    }

    .partySize.first {
        border-left: none;
        border-right: 2px solid #F6F3FA;
    }

    .partySize.middle {
        border-right: 2px solid #F6F3FA;
        border-left: 2px solid #F6F3FA;
    }

    .partySize.last {
        border-right: none;
        border-left: 2px solid #F6F3FA;
    }

    .overwrite {
        background: #343236;
        height: 100%;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .firstRow {
        width: 100%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .secondRow {
        width: 90%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .thirdRow {
        width: 80%;
        height: 4px;
        padding: 0px 10%;
        background: #F6F3FA;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .fourthRow {
        width: 60%;
        height: 4px;
        padding: 0px 10%;
        background: #F6F3FA;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .fifthRow {
        width: 40%;
        height: 4px;
        padding: 0px 17.5%;
        background: #F6F3FA;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .sixthRow {
        width: 5%;
        height: 4px;
        padding: 0px 3%;
        background: #F6F3FA;
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
        background: #9A969E;
        height: 20px;
        width: 20px;
    }
  
    .partySize {
        color: whitesmoke;
    }

    .current {
        color: #EDC430;
    }

    .passing:not(.active) {
        background: #3468C3;
    }

    .passing.active {
        background: #6EC0EC;
    }

    .failing:not(.active) {
        background: #C21B1B;
    }

    .failing.active {
        background: #E94646;
    }
  
</style>
