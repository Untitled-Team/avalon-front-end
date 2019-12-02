<template>
    <div id="leaveGame">

        <div class="leaveGameWrapper" v-if="modalActive">
            <div class="innerWrapper">
                <div>Are you sure you want to leave?</div>

                <div>You cannot come back to this game.</div>

                <button @click="toggleModalActive" class="stayInGame">Take me back!</button>
                <button @click="resetToLobby" class="leaveGameButton">I'm sure</button>
            </div>
        </div>

        <input type="submit" @click="toggleModalActive" class="leaveGameButtonModal" value="Leave Game"/>
    </div>
</template>

<script>
    export default {
        name: 'AssassinVote',
        data: function () {
            return {
                modalActive: false,
            }
        },
        methods: {
            resetToLobby: function () {
                window.localStorage.removeItem("vuex")
                window.localStorage.clear()
                location.reload()
            },
            toggleModalActive: function () {
                this.modalActive = !this.modalActive
            },
        },
        created() {
            this.$options.sockets.onmessage = (msg) => {
                let msgJSON = JSON.parse(msg.data)

                if (msgJSON.event === 'GameNoLongerExists') {
                    this.resetToLobby()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .leaveGameWrapper {
        position: fixed;
        background-color: rgba(10, 10, 10, 1);
        color: antiquewhite;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .innerWrapper {
        margin: 0 auto;
        width: 90%;
        font-size: 2em;
    }

    .leaveGameButtonModal {
        font-family: inherit;
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 0;
        border: $failed solid 1px;
        appearance: none;
        margin-right: 3px;
        padding-right: 20px;
        padding-left: 20px;
        font-size: 2.3em;
        font-weight: bold;
        background: $failed;
        color: whitesmoke;
    }

    .stayInGame {
        color: $successful;
        font-size: 25px;
        margin: 5% 3%;
        -webkit-tap-highlight-color: transparent;
    }

    .leaveGameButton {
        color: red;
        font-size: 25px;
        margin: 5% 3%;
        -webkit-tap-highlight-color: transparent;
    }
</style>