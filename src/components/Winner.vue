<template>
    <div id="winner">
        <div id="badGuysWin" v-show="badGuysWin" class="bigText">
            Bad guys win!
        </div>
        <div id="goodGuysWin" v-show="goodGuysWin" class="bigText">
            Good guys win!
        </div>
        <div class="mediumText">
            <div id="merlin">Merlin: {{ gameOverData.merlin }}</div>
            <div id="goodGuys">Good Guys:
                <div :key="index" v-for="(goodGuy, index) in goodGuysSansMerlin">
                    {{ goodGuy}}
                </div>
            </div>
            <div id="assassin">Assassin: {{ gameOverData.assassin }}</div>
            <div id="badGuys">Bad Guys:
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


<style scoped>
</style>