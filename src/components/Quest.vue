<template>
    <div class="questWrapper section" v-on:click="makeActive" v-bind:class="{active: isActive, inactive: !isActive }">
        <div class="mediumText">
            {{ missionNumber }}
        </div>
        <div class="partySize biggerText" v-bind:class="{passing: didPass, failing: didFail}">
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
            }
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
    }

    .questWrapper {
        cursor: pointer;
        padding-bottom: 3rem;
    }

    .active {
        border-top: 5px solid #b0912a;
        border-left: 2.5px solid #b0912a;
        border-right: 2.5px solid #b0912a;
        border-bottom: 5px solid transparent;
        background: #5a596b;
    }

    .inactive {
        border: 5px solid #b0912a;
        background: #3d3c5c;
    }

    .passing {
        background: lightblue;
    }

    .failing {
        background: tomato;
    }
</style>