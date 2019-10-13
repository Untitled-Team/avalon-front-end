<template>
    <div id="playerInfo">
        <div v-if="isGood">
            <div class="card-image">
                <img src="@/assets/goodGuyBig.png">
            </div>
            <div class="info">
                <p>You're a regular good guy!</p>
                <p>Keep reading this for a second so it's not obvious.</p>
                <p>More text</p>
            </div>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div v-if="isBad">
            <div class="card-image">
                <img src="@/assets/badGuyBig.png">
            </div>
            <div class="info">
                <p>You're a regular bad guy!</p>
            </div>
            <p>The bad guys are: </p>
            <p :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div v-if="isMerlin">
            <div class="card-image">
                <img class="cardBackground" src="@/assets/merlinCardBig.png">
                <img class="cardRole" src="@/assets/merlinBig.png">
            </div>
            <div class="info">
                <p>You're Merlin!</p>
            </div>
            <p>The bad guys are: </p>
            <p :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div v-if="isAssassin">
            <div class="card-image">
                <img class="cardBackground" src="@/assets/assassinCardBig.png">
                <img class="cardText" src="@/assets/assassinTextBig.png">
                <img class="cardPicture" src="@/assets/assassinBig.png">
            </div>
            <div class="badGuysText">
                <p>Allies: </p>
                <p :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
            </div>
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
                console.log(msgJSON)

                if (msgJSON.event === 'PlayerReadyAcknowledgement') {
                    this.ready = true
                }
            }
        }
    }
</script>

<style scoped>
    #playerInfo {
        text-align: center;
    }

    .ready {
        height: 40px;
        background-color: seagreen;
        color: sandybrown;
        padding: 35px;
    }

    .cardText {
        width: 65%;
        height: auto;
        margin: auto;
        position: absolute;
        left: 17.5%;
        right: 17.5%;
        top: 15%;
    }

    .cardPicture {
        width: 95%;
        height: auto;
        margin: auto;
        position: absolute;
        left: 1.5%;
        right: 3.5%;
        top: -4%;
    }

    .cardBackground {
        width: 100%;
        height: auto;
        margin: auto;
    }
</style>