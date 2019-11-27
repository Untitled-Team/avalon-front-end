<template>
    <div id="leaveGame">
        <button @click="resetToLobby" class="leaveGameButton">Leave Game</button>
    </div>
</template>

<script>
    export default {
        name: 'AssassinVote',
        methods: {
            resetToLobby: function () {
                window.localStorage.removeItem("vuex")
                window.localStorage.clear()
                location.reload()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .leaveGameButton {
        color: red;
        font-size: 25px;
    }
</style>