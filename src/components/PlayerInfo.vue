<template>
    <div id="playerInfo">
        <div class="card good" v-if="isGood">
            <p>You're a regular good guy!</p>
            <p>Keep reading this for a second so it's not obvious.</p>
            <p>More text</p>
            <button v-on:click="confirmReady" >Got it. I'm ready!</button>
        </div>
        <div class="card bad" v-if="isBad">
            <p>You're a regular bad guy!</p>
            <p>The bad guys are: </p>
            <p v-bind:key="badGuy" v-for="badGuy in badGuys">{{badGuy}}</p>
            <button v-on:click="confirmReady" >Got it. I'm ready!</button>
        </div>
        <div class="card merlin" v-if="isMerlin">
            <p>You're Merlin!</p>
            <p>The bad guys are: </p>
            <p v-bind:key="badGuy" v-for="badGuy in badGuys">{{badGuy}}</p>
            <button v-on:click="confirmReady" >Got it. I'm ready!</button>
        </div>
        <div class="card assassin" v-if="isAssassin">
            <p>You're the assassin!</p>
            <p>The bad guys are: </p>
            <p v-bind:key="badGuy" v-for="badGuy in badGuys">{{badGuy}}</p>
            <button v-on:click="confirmReady" >Got it. I'm ready!</button>
        </div>
        <div class="ready" v-show="ready">Great!  Once everybody is ready the first mission will begin.</div>
    </div>
</template>

<script>
    export default {
        name: 'PlayerInfo',
        data: function() {
            return {
                ready: false
            }
        },
        props: ["good", "bad", "merlin", "assassin", "badGuys"],
        methods: {
            confirmReady: function () {
                this.ready = true
                this.$socket.emit('playerReady', {})
            }
        },
        computed: {
            isGood: function() {return this.good},
            isBad: function() {return this.bad},
            isMerlin: function() {return this.merlin},
            isAssassin: function() {return this.assassin}
        }
    }
</script>


<style scoped>
    #playerInfo {
        text-align: center;
        padding: 3%;
    }

    .card {
        margin: auto;
        width: 35%;
        height: 200px;
        color: beige;
        padding: 35px;
    }

    .good {
        background: lightblue;
    }

    .bad {
        background: tomato;
    }

    .merlin {
        background: mediumblue;
    }

    .assassin {
        background: darkred;
    }

    .ready {
        margin: auto;
        width: 35%;
        height: 40px;
        background-color: seagreen;
        color: sandybrown;
        padding: 35px;
    }
</style>
