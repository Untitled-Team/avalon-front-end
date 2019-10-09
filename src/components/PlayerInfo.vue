<template>
    <div id="playerInfo">
        <div class="card good" v-if="isGood">
            <div class="card-image">
                <img src="@/assets/goodGuy.jpg">
            </div>
            <div class="info">
                <p>You're a regular good guy!</p>
                <p>Keep reading this for a second so it's not obvious.</p>
                <p>More text</p>
            </div>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div class="card bad" v-if="isBad">
            <div class="card-image">
                <img src="@/assets/badGuy.jpg">
            </div>
            <div class="info">
                <p>You're a regular bad guy!</p>
            </div>
            <p>The bad guys are: </p>
            <p :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div class="card merlin" v-if="isMerlin">
            <div class="card-image">
                <img src="@/assets/merlin.jpg">
            </div>
            <div class="info">
                <p>You're Merlin!</p>
            </div>
            <p>The bad guys are: </p>
            <p :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div class="card assassin" v-if="isAssassin">
            <div class="card-image">
                <img src="@/assets/assassin.jpg">
            </div>
            <div class="info">
                <p>You're the assassin!</p>
            </div>
            <p>The bad guys are: </p>
            <p :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div class="ready" v-show="ready">Great! Once everybody is ready the first mission will begin.</div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

    export default {
        name: 'PlayerInfo',
        data: function () {
            return {
                ready: false
            }
        },
        props: ["character", "badGuys"],
        methods: {
            confirmReady: function () {
                console.log('player ready clicked')
                let confirmReadyObj = {event: 'PlayerReady'};
                WebsocketService.sendObj(this.$socket, confirmReadyObj);
            }
        },
        computed: {
            isGood: function () {
                return this.character === "NormalGoodGuy"
            },
            isBad: function () {
                return this.character === "NormalBadGuy"
            },
            isMerlin: function () {
                return this.character === "Merlin"
            },
            isAssassin: function () {
                return this.character === "Assassin"
            }
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)

                if (msgJSON.event === 'PlayerReadyAcknowledgement') {
                    this.ready = true
                }
            }
        }
    }
</script>

<style scoped>
    p {
        padding: 1em;
    }

    #playerInfo {
        text-align: center;
        padding: 3%;
    }

    .card {
        color: white;
        margin: auto;
        padding: 35px;
        display: inline-block;
        width: 100%;
    }

    .good {
        background: lightblue;
        color: black;
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
        height: 40px;
        background-color: seagreen;
        color: sandybrown;
        padding: 35px;
    }
</style>