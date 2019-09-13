<template>
    <div class="questWrapper section"
         v-on:click="makeActive" v-bind:class="{active: isActive, inactive: !isActive}">
        <div class="mediumText">
            {{ missionNumber }}
        </div>
        <div class="partySize biggerText" v-bind:class="{passing: didPass, failing: didFail, current: isCurrent}">
            {{ quest.numberOfAdventurers }}
        </div>
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'Quest',
        props: ["quest", "missionNumber"],
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
            isActive: function () {
                return this.missionNumber === store.state.activeMission
            },
            isCurrent: function () {
                return this.missionNumber === store.state.currentMission
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

    .partySize {
        border-radius: 50%;
        background: grey;
        color: whitesmoke;
        -moz-box-shadow: 2px 2px black;
        -webkit-box-shadow: 2px 2px black;
        box-shadow: 3px 3px black;
    }

    .questWrapper {
        cursor: pointer;
        padding-bottom: 3rem;
    }

    .current {
        background: #f8ff20;
    }

    .active {
        border-top: 4px solid #b0912a;
        border-left: 3.75px solid #b0912a;
        border-right: 3.75px solid #b0912a;
        border-bottom: 4px solid transparent;
        background: #5a596b;
    }

    .inactive {
        border: 4px solid #b0912a;
        border-left: 2px solid #b0912a;
        border-right: 2px solid #b0912a;
        background: #3d3c5c;
    }

    .passing {
        background: lightblue;
    }

    .failing {
        background: tomato;
    }
</style>