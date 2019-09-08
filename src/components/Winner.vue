<template>
    <div id="questInfo">
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
        props: ['theWinnerIs'],
        computed: {
            goodGuysWin: function () {
                return this.theWinnerIs === 'goodGuysWin'
            },
            badGuysWin: function () {
                return this.theWinnerIs === 'badGuysWin'
            }
        }
    }
</script>


<style scoped>
</style>