<template>
    <div id="questInfo">
        <div v-show="badGuysWin">
            Bad guys win :)
        </div>
        <div v-show="!badGuysWin">
            Good guys win :)
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Winner',
        props: ['badGuysWin']
    }
</script>


<style scoped>
</style>