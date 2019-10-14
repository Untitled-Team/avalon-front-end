<template>
    <div id="playerInfo">
        <div class="card good" v-if="isGood">
            <div class="card-image">
                <img class="cardBackground" src="@/assets/merlinCardBig.png">
                <img class="cardPicture" src="@/assets/goodGuyBig.png">
            </div>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div class="card bad" v-if="isBad">
            <div class="card-image">
                <img class="cardBackground" src="@/assets/assassinCardBig.png">
                <img class="cardPicture" src="@/assets/badGuyBig.png">
            </div>
            <div class="badGuysText">
                <p class="allies">Allies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div class="card merlin" v-if="isMerlin">
            <div class="card-image">
                <img class="cardBackground" src="@/assets/merlinCardBig.png">
                <img class="cardPicture" src="@/assets/merlinBig.png">
            </div>
            <div class="badGuysText">
                <p class="allies">Enemies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
            <button class="button is-small" v-show="!ready" v-on:click="confirmReady">Ready</button>
        </div>

        <div class="card assassin" v-if="isAssassin">
            <div class="card-image">
                <img class="cardBackground" src="@/assets/assassinCardBig.png">
                <img class="cardText" src="@/assets/assassinTextBig.png">
                <img class="cardPicture" src="@/assets/assassinBig.png">
            </div>
            <div class="badGuysText">
                <p class="allies">Allies</p>
                <div class="flexTest">
                    <p class="badGuyName" :key="index" v-for="(badGuy, index) in badGuys">{{badGuy}}</p>
                </div>
            </div>
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

    .badGuysText {
        color: white;
        position: absolute;
        top: 73%;
        font-size: 3em;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        width: 35%;
    }

    .flexTest {
        display: flex;
        flex-wrap: wrap;
    }

    .badGuyName {
        flex: 0 50%;
    }

    .allies {
        text-decoration: underline;
    }
</style>