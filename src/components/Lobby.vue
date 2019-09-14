<template>
    <div id="lobby">
        <div class="section">
            <h1 class="somePadding">Begin the game once everyone is in the lobby</h1>
            <h2 class="somePadding">Once the game has begun new players cannot join</h2>
            <h1 class="somePadding bold">Room Number: {{ roomId }}</h1>
            <h3 class="somePadding">Total Players: {{ players.length }}</h3>
            <div class="lobbyPlayer somePadding" :key="index" v-for="(player, index) in players">
                {{ player }}
            </div>

            <form @submit.prevent="startGame">
                <input type="submit" class="button is-small" value="Everyone's in!"/>
            </form>

            <div v-show="!correctPlayerNumbers">
                Avalon requires between 5 and 10 players.
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Lobby',
        props: ['players', 'roomId'],
        computed: {
            correctPlayerNumbers: function () {
                return this.players.length >= 5 && this.players.length <= 10
            }
        },
        methods: {
            startGame: function () {
                if (this.correctPlayerNumbers) {
                    this.$socket.sendObj({event: 'StartGame'});
                }
            },
        },
    }
</script>

<style scoped>
    #lobby {
        background-color: #189371;
    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1.75em;
    }

    h3 {
        font-size: 1.5em;
    }

    .somePadding {
        padding: .5em;
    }

    .bold {
        font-weight: bold;
    }
</style>
