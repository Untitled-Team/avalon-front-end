<template>
    <div id="leaveGame">

        <div class="modal" :class="{'is-active': modalActive === true}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div>Are you sure you want to leave?</div>

                <div>You cannot come back to this game.</div>

                <button @click="toggleModalActive" class="stayInGame">Take me back!</button>
                <button @click="resetToLobby" class="leaveGameButton">I'm sure</button>
            </div>
        </div>


        <button @click="toggleModalActive" class="leaveGameButtonModal">Leave Game</button>
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
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modal-content {
        color: antiquewhite;
        font-size: 20px;
    }

    .leaveGameButtonModal {
        color: red;
        font-size: 25px;
    }

    .stayInGame {
        color: $successful;
        font-size: 25px;
        margin: 5% 3%;
    }

    .leaveGameButton {
        color: red;
        font-size: 25px;
        margin: 5% 3%;
    }
</style>