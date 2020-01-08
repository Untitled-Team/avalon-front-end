<template>
    <div id="winner" :class="{defeat: badGuysWin, victory: goodGuysWin}">
        <div class="badGuysWin" v-show="badGuysWin">
            <div class="badGuysWinTextWrapper">
                <img src="@/assets/badGuysWinText.png">
            </div>
            <div class="defeatScreenWrapper">
                <img class="defeatScreen" src="@/assets/defeatScreen.png">
            </div>
        </div>
        <div class="goodGuysWin" v-show="goodGuysWin">
            <div class="goodGuysWinTextWrapper">
                <img src="@/assets/goodGuysWinText.png">
            </div>
            <div class="victoryScreenWrapper">
                <img class="victoryScreen" src="@/assets/victoryScreen.png">
            </div>
        </div>
        <div class="infoWrapper">
            <div class="merlin">Merlin: {{ gameOverData.merlin }}</div>
            <div class="assassin">Assassin: {{ gameOverData.assassin }}</div>
            <div class="badGuys">Bad Guys:
                <div :key="index" v-for="(badGuy, index) in badGuysSansAssassin">
                    {{ badGuy}}
                </div>
            </div>
        </div>
        <LeaveGame class="leaveGame"/>
    </div>
</template>

<script>
    import LeaveGame from "./LeaveGame"

    export default {
        name: 'Winner',
        components: {
            LeaveGame
        },
        computed: {
            gameOverData: function () {
                return this.$store.state.Winner.gameOverData
            },
            goodGuysWin: function () {
                return this.gameOverData.winningTeam === 'GoodGuys'
            },
            badGuysWin: function () {
                return this.gameOverData.winningTeam === 'BadGuys'
            },
            badGuysSansAssassin: function () {
                return this.gameOverData.badGuys.filter(x => x !== this.gameOverData.assassin)
            },
        }
    }
</script>


<style lang="scss" scoped>
    @import "../styles/variables";

    .leaveGame {
        margin: 3% auto;
        max-width: 90%;
        width: 60%;
    }

    .defeat {
        background-color: $failed;
    }

    .victory {
        background-color: $successful;
    }

    #winner {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
    }

    .badGuysWin {
        display: flex;
        flex: 3 1 auto;
        flex-direction: column;

        .badGuysWinTextWrapper {
            display: flex;
            flex: 1 1 auto;
            margin: 0 auto;
            height: 0;
            img {
                object-fit: contain;
            }
            margin-bottom: 5%;
            margin-top: 2%;
        }

        .defeatScreenWrapper {
            display: flex;
            flex: 5 1 auto;
            height: 0;

            img {
                object-fit: contain;
            }
        }
    }

    .goodGuysWin {
        display: flex;
        flex: 3 1 auto;
        flex-direction: column;

        .goodGuysWinTextWrapper {
            display: flex;
            flex: 1 1 auto;
            margin: 0 auto;
            height: 0;
            img {
                object-fit: contain;
            }
            margin-bottom: 5%;
            margin-top: 2%;
        }

        .victoryScreenWrapper {
            display: flex;
            flex: 5 1 auto;
            height: 0;

            img {
                object-fit: contain;
            }
        }
    }

    .infoWrapper {
        margin-top: 5px;
        display: flex;
        flex: 1 1 0;
        font-size: 1.25rem;
        color: floralwhite;
        flex-direction: column;
    }

    @media (max-height: 472px) {
        .infoWrapper {
            font-size: 2em;
        }
    }
</style>
