<template>
    <div id="questInfo">
        WINNER!!!! :p
        <div v-show="badGuysWin">
            Bad guys win :)
        </div>
        <div v-show="goodGuysWin">
            Good guys win :)
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
            }
        }
    }
</script>


<style scoped>
</style>