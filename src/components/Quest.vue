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
        padding: 3rem 4rem;
    }
    .partySize {
        border-radius: 50%;
        background: grey;
        color: whitesmoke;
    }

    .questWrapper {
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

    .passing {
        background: lightblue;
    }

    .failing {
        background: tomato;
    }
</style>