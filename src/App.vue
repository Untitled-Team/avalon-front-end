<template>
  <div id="app">
    <Avalon />
  </div>
</template>

<script>
  import Avalon from "./views/Avalon";

  export default {
    name: "App",
    components: {
      Avalon
    },
    actions: {
      connect: function () {
        console.log('socket connected')
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>