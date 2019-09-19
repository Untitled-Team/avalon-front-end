<template>
<div id="lobby-container" class="container is-paddingless">
  <div id="lobby" class="container is-paddingless">

    <div id="lobby-header" class="container">
      <h3 class="title">
        Waiting for other players...
      </h3>
    </div>

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
</div>
</template>

<script>
    import WebsocketService from "../services/WebsocketService";

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
                    let StartGameMessage = {event: 'StartGame'};
                    WebsocketService.sendObj(StartGameMessage);
                }
            },
        },
    }
</script>

<style scoped>

  #lobby-header {
    padding: 10px;
  }

  /*
  #lobby-container {
    background-color: #189371;
  }
  */

  #lobby {
      background-color: #189338;
      max-width: 500px;
  }

  h1 {
      height: 20vh;
      font-size: 2em;
  }

  h2 {
      font-size: 1.75em;
  }

  h3 {
      font-size: 1.5em;
      letter-spacing: -.06rem;
      word-spacing: -1px;
  }

  .somePadding {
      padding: .5em;
  }

  .bold {
      font-weight: bold;
  }
</style>
