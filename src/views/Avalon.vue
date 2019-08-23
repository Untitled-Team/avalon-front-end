<template>
    <div class="home">
        <Intro v-bind:tstmsg="tstmsg" />
    </div>
</template>

<script>
    import Intro from "../components/Intro";

    export default {
        name: 'home',
        components: {
          Intro
        },
      data: function () {
          return {
            tstmsg: "test gibberish"
          }
      }
    }
</script>

<style>
</style>
