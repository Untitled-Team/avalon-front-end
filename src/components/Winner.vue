<template>
    <div id="winner">
        <div v-show="badGuysWin" class="bigText">
            Bad guys win!
        </div>
        <div v-show="goodGuysWin" class="bigText">
            Good guys win!
        </div>
        <div class="mediumText">
            <div>Merlin: {{ gameOverData.merlin }}</div>
            <div>Good Guys:</div>
            <div :key="index" v-for="(goodGuy, index) in goodGuysSansMerlin">
                {{ goodGuy}}
            </div>
            <div>Assassin: {{ gameOverData.assassin }}</div>
            <div>Bad Guys:</div>
            <div :key="index" v-for="(badGuy, index) in badGuysSansAssassin">
                {{ badGuy}}
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