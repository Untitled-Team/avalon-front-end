<template>
    <div id="passFailVote">
        <div class="questingMessage is-size-4-mobile is-size-4-desktop">

            <span :key="index" v-for="(player, index) in missionParty">
                <span v-if="index == missionParty.length-1"> and </span>{{player}}<span
                    v-if="!(index == missionParty.length-1 || index == missionParty.length-2)">, </span>
            </span> are questing
        </div>

        <div class="swordWrapper">
            <img class="crossedSwords" src="@/assets/crossedSwordsBig.png"/>
        </div>

        <div v-show="!playerHasVoted && playerVoting" class="theButtons">
            <img class="passButton" src="@/assets/passButtonBig.png" v-on:click="voteToPass"/>
            <img class="failButton" src="@/assets/failButtonBig.png" v-on:click="voteToFail"/>
        </div>

        <div id="WaitingOnOthers" class="is-size-4-mobile is-size-4-desktop" v-show="playerHasVoted || !playerVoting">
            Waiting on others...
        </div>
    </div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService"

    export default {
        name: 'PassFailVote',
        props: ["missionParty"],
        data: function () {
            return {
                playerHasVoted: false,
            }
        },
        methods: {
            voteToPass: function () {
                let QuestVotePassObj = {
                    event: 'QuestVote',
                    questPassVote: true,
                };
                WebsocketService.sendObj(this.$socket, QuestVotePassObj)
            },
            voteToFail: function () {
                let QuestVoteFailObj = {
                    event: 'QuestVote',
                    questPassVote: false,
                };
                WebsocketService.sendObj(this.$socket, QuestVoteFailObj)
            },
        },
        computed: {
            playerVoting: function () {
                return this.missionParty.includes(this.$store.getters.getNickname)
            }
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)

                if (msgJSON.event === 'QuestVoteAcknowledgement') {
                    this.playerHasVoted = true
                }
            }
        }
    }
</script>

<style scoped>
    .someMargin {
        margin: .5em 0px;
    }

    .questingMessage {
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 10px;
    }

    #passFailVote {
        height: 100%;
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-grow : 1;
        color: whitesmoke;

    }

    .swordWrapper {
        display: flex;
        flex: 1 1 0;
        padding-bottom: 20px;
        padding-top: 10px;


    }
    .crossedSwords {
        display: flex;
        flex: 1 1 0;
        object-fit: contain;
    }

    /*.crossedSwords {*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    margin: 0 auto;*/
    /*    width: 90%;*/
    /*    margin-top: -20px;*/
    /*}*/

    .theButtons {
        margin: 0 auto;
        padding-bottom: 5px;
    }

    .passButton {
        max-width: 30%;
        margin-right: 20%;
        cursor: pointer;
    }

    .failButton {
        width: 30%;
        cursor: pointer;
    }
</style>