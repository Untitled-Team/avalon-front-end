<template>
    <div id="questInfo" class="container is-paddingless">
        <div class="columns is-mobile is-paddingless is-marginless quests">
            <div class="column is-one-fifth is-marginless is-paddingless quest" :key="index" v-for="(quest, index) in quests">
                <Quest :quest="quest" :missionNumber="index+1" :quests="quests" class="index"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Quest from "./Quest";

    export default {
        name: 'QuestInfo',
        components: {
            Quest,
        },
        props: ["quests"],
    }
</script>

<style scoped>
  #playerInfo {
    margin: 1.5px;
  }

  #questInfo {
      /*min-height: 10vh;*/
      /*height: 22vh;*/
    }

.column {
    padding: 0;
}

.permanentPlayerInfo {
    /*padding: 10px;*/
    /*background: #86A;*/
    border: 3px solid #b0912a;
    /*background: linear-gradient(180deg, #c0912a 40%, #b0912a 100%);*/
}

.quests {
    height: 100%;
}

.questWrapper {
    /*position: absolute;*/
    /* top: 50%; */
    /* transform: translateY(-50%); */
    cursor: pointer;
    /*padding-bottom: 3rem;*/
    /*padding-top: 2.5vh;*/
    /*height: 100%;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #343236;
}
</style>
