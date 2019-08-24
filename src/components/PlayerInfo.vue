<template>
    <div id="playerInfo">
        good: {{good}} <br />
        bad: {{bad}} <br />
        merlin: {{merlin}} <br />
        assassin: {{assassin}} <br />
    </div>
</template>

<script>
    export default {
        name: 'PlayerInfo',
        props: ["good", "bad", "merlin", "assassin"],
        methods: {
        }
    }
</script>

<style scoped>
    #intro {
        margin: 40px 0 0;
    }

    #menu {
        padding: 15px;
        background: tomato;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #menu input {
        width: 70%;
        display: block;
        margin: 35px;
        flex: 1 1 0;
        border: 1px solid yellow;
        text-align: center;
        min-height: 40px;
        position: relative
    }
</style>
