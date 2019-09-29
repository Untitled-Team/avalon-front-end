<template>
    <div class="questWrapper container is-paddingless" v-on:click="makeActive"
         v-bind:class="{active: isActive, inactive: !isActive, passing: didPass, failing: didFail, notCompleted: !completed}">
        <div class="partySize biggerText" v-bind:class="{current: isCurrent}">
            {{ quest.numberOfAdventurers }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Quest',
        props: ["quest"],
        methods: {
            makeActive: function () {
                this.$store.state.activeMission = this.missionNumber
            }
        },
        computed: {
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
        }
    }
</script>

<style scoped>
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
        /* color: whitesmoke; */
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
