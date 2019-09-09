<template>
    <div id="questInfo">
        <span class="questWrapper" v-bind:class="{active: isActive, inactive: !isActive }">
            <div class="big"> {{ missionNumber }}</div>
            <div class="partySize"
                 v-bind:class="{passing: didPass, failing: didFail}">
                {{ quest.numberOfAdventurers }}
            </div>
           <div>Pass Votes: {{ quest.votes.passVotes }}</div>
           <div>Fail Votes: {{ quest.votes.failVotes }}</div>
            <div>Party: {{ quest.party }}</div>
        </span>
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'Quest',
        props: ["quest", "missionNumber"],
        computed: {
            didPass: function () {
                return this.pass === true
            },
            didFail: function () {
                return this.pass === false
            },
            isActive: function () {
                return this.missionNumber === store.state.activeMission
            }
        }
    }
</script>

<style scoped>
    .big {
        font-size: 25px;
    }

    #questInfo {
        cursor: pointer;
    }

    .active {
        border-top: 5px solid red;
        border-left: 2.5px solid red;
        border-right: 2.5px solid red;
        border-bottom: 5px solid white;
    }

    .inactive {
        border: 5px solid red;
    }

    .questWrapper {
        display: inline;
        float: left;
    }

    .partySize {
        border-radius: 50%;
        background: grey;
        color: whitesmoke;
        width: 100px;
        height: 100px;
        vertical-align: middle;
        display: table-cell;
        font-size: 35px;
    }

    .passing {
        background: lightblue;
    }

    .failing {
        background: tomato;
    }
</style>