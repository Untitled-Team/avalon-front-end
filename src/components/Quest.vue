<template>
    <div class="questWrapper container is-paddingless"
         v-on:click="makeActive"
         v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
        <!-- <div class="mediumText"> -->
        <!--     {{ missionNumber }} -->
        <!-- </div> -->
        <div class="partySize biggerText" v-bind:class="{current: isCurrent, first: isFirst, middle: isMiddle, last: isLast, active: isActive}">
            {{ quest.numberOfAdventurers }}
        </div>
        <!-- <div class="passOrFail" v-bind:class="{passing: didPass, failing: didFail}"></div> -->
        <div class="bannerContainer"
             v-bind:class="{activeMissionPassing: activeMissionPassing, activeMissionFailing: activeMissionFailing, activeMissionIncomplete: activeMissionIncomplete}">
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
        <div class="seventhRow">
          <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
          </div>
        </div>
        <div class="eighthRow">
          <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
          </div>
        </div>
        <div class="ninthRow">
          <div class="overwrite" v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
          </div>
        </div>
        <div class="tenthRow">
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
    .partySize.active {
        padding-top: 4px;
    }

    .questWrapper.active.notCompleted {
        background: #5B585F;
    }

    .bannerContainer {
        height: 100%;
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

    .first {
        border-left: none;
        border-right: 2px solid #F6F3FA;
    }

    .middle {
        border-right: 2px solid #F6F3FA;
        border-left: 2px solid #F6F3FA;
    }

    .last {
        border-right: none;
        border-left: 2px solid #F6F3FA;
    }

    .overwrite {
        background: #343236;
        /*width: 95%;*/
        height: 100%;
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .firstRow {
        width: 100%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .secondRow {
        width: 90%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .thirdRow {
        width: 80%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .fourthRow {
        width: 70%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .fifthRow {
        width:60%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .sixthRow {
        width:50%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .seventhRow {
        width:40%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .eighthRow {
        width:30%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .ninthRow {
        width:20%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
        margin: 0 auto;
    }

    .inactive > .bannerContainer > .tenthRow {
        width: 10%;
        height: 4px;
        padding: 0px 5%;
        background: #F6F3FA;
        /*border-right: 4px solid #F6F3FA;*/
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
        /*margin: 0 auto;*/
        margin-right: auto;
        margin-left: auto;
        /*margin-right: 1px;*/
        border-radius: 50%;
        background: #9A969E;
        height: 20px;
        width: 20px;
    }
  
    .partySize {
        /* border-radius: 50%; */
        /* background: grey; */
        color: whitesmoke;
        /* -moz-box-shadow: 2px 2px black; */
        /* -webkit-box-shadow: 2px 2px black; */
        /* box-shadow: 3px 3px black; */
    }
  
  /* .questWrapper { */
  /*     cursor: pointer; */
  /*     /\*padding-bottom: 3rem;*\/ */
  /*     /\*padding-top: 2.75rem;*\/ */
  /*     height: 100%; */
  /* } */
  
    .current {
        color: #EDC430;
        /*background: #3040ED;*/
    }
  
  /* div:first-child { */
  /*     /\*border-top: 4px solid #b0912a;*\/ */
  /*     border-left: 3.75px solid transparent; */
  /*     border-right: 0px solid #b0912a; */
  /*     /\*border-bottom: 4px solid transparent;*\/ */
  /*     /\*border-bottom-left-radius: 0px;*\/ */
  /*     /\*border-radius: 0px;*\/ */
  /*     background: #5a596b; */
  
  /* } */
  
  /* .active { */
  /*     /\*border-top: 4px solid #b0912a;*\/ */
  /*     border-left: 3.75px solid #b0912a; */
  /*     border-right: 0px solid #b0912a; */
  /*     /\*border-bottom: 4px solid transparent;*\/ */
  /*     /\*border-bottom-left-radius: 0px;*\/ */
  /*     /\*border-radius: 0px;*\/ */
  /*     background: #5B585F; */
  /*     color: #F6F3FA; */
  /* } */
  
  /* .inactive { */
  /*     border-bottom: 4px solid #b0912a; */
  /*     border-left: 2px solid #b0912a; */
  /*     border-right: 2px solid #b0912a; */
  /*     background: #343236; */
  /*     color: #F6F3FA; */
  /* } */
  
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
