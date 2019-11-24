<template>
    <div id="winner" :class="{defeat: badGuysWin, victory: goodGuysWin}">
        <div class="badGuysWin" v-show="badGuysWin">
            <div class="defeatScreenWrapper">
                <img class="defeatScreen" src="@/assets/defeatScreen.png">
            </div>
        </div>
        <div class="goodGuysWin" v-show="goodGuysWin">
            <div class="victoryScreenWrapper">
                <img class="victoryScreen" src="@/assets/victoryScreen.png">
            </div>
        </div>
        <div>
            <div class="merlin">Merlin: {{ gameOverData.merlin }}</div>
            <div class="goodGuys">Good Guys:
                <div :key="index" v-for="(goodGuy, index) in goodGuysSansMerlin">
                    {{ goodGuy}}
                </div>
            </div>
            <div class="assassin">Assassin: {{ gameOverData.assassin }}</div>
            <div class="badGuys">Bad Guys:
                <div :key="index" v-for="(badGuy, index) in badGuysSansAssassin">
                    {{ badGuy}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Winner',
        props: ['gameOverData'],
        computed: {
            goodGuysWin: function () {
                return this.gameOverData.winningTeam === 'GoodGuys'
            },
            badGuysWin: function () {
                return this.gameOverData.winningTeam === 'BadGuys'
            },
            goodGuysSansMerlin: function () {
                return this.gameOverData.goodGuys.filter(x => x !== this.gameOverData.merlin)
            },
            badGuysSansAssassin: function () {
                return this.gameOverData.badGuys.filter(x => x !== this.gameOverData.assassin)
            },
        }
    }
</script>


<style lang="scss" scoped>
    @import "../styles/variables";

    .defeat {
        background-color: $failed;
    }

    .victory {
        background-color: $successful;
    }
</style>