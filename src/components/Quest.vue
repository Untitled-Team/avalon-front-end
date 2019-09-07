<template>
    <div id="questInfo">
        <span class="questWrapper">
            <div class="partySize" v-bind:class="{passing: didPass, failing: didFail}">{{ partySize }}</div>
        </span>
        Pass Votes: {{ votes.passVotes }} <br />
        Fail Votes: {{ votes.failVotes }}
        Party: {{ party }}
    </div>
</template>

<script>
    export default {
        name: 'Quest',
        props: ["partySize", "pass", "votes", "party"],
        computed: {
            didPass: function () {
                return this.pass === true
            },
            didFail: function () {
                return this.pass === false
            },
        }
    }
</script>

<style scoped>
    #questInfo {
        border-bottom: #7f8a69 ridge;
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