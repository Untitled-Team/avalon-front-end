<template>
    <div id="questInfo">
        <div class="questWrapper">
            <div class="partySize">{{ partySize }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Quest',
        props: ["partySize"],
    }
</script>

<style scoped>
    .questWrapper {
        display: inline;
        float: left;
    }
    .partySize {
        border-radius: 50%;
        background: slategrey;
        color: whitesmoke;
        width: 100px;
        height: 100px;
        vertical-align: middle;
        display: table-cell;
        font-size: 35px;
    }
</style>