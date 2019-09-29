<template>
    <div id="questInfo" class="container is-paddingless">
<!--         <div id="playerInfo" class="columns">-->
<!--             <div class="column is-full permanentPlayerInfo mediumText">-->
<!--                 <div class="level">-->
<!--                     <span id="nickname" class="level-left level-item">{{ nickname }}</span>-->
<!--                     <span id="character" class="level-right level-item">{{ character }}</span>-->
<!--                 </div>-->
<!--             </div>-->
<!--         </div>-->
        <div class="columns is-mobile is-paddingless is-marginless quests">
            <div class="column is-one-fifth is-marginless is-paddingless quest" :key="index" v-for="(quest, index) in quests">
                <Quest :quest="quest" :missionNumber="index+1"/>
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
        computed: {
            nickname: function () {
                return this.$store.getters.getNickname
            },
            character: function () {
                return this.$store.getters.getCharacter
            },
        }
    }
</script>

<style scoped>
  #playerInfo {
    margin: 1.5px;
  }

  #questInfo {
  min-height: 120px;
      height: 22vh;
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

.active {
    /*border-top: 4px solid #b0912a;*/
    border-left: 2px solid #F6F3FA;
    border-right: 2px solid #F6F3FA;
    /*border-bottom: 4px solid transparent;*/
    /*border-bottom-left-radius: 0px;*/
    /*border-radius: 0px;*/
    /*background: #5B585F;*/
    color: #F6F3FA;
}

.active.notCompleted {
    background: #5B585F;
}

.quests > .quest:nth-of-type(1) > .active {
    border: none;
    border-bottom: none;
    border-left: none;
    border-right: 2px solid #F6F3FA;
    /*background: #5B585F;*/
    color: #F6F3FA;
}

.quests > .quest:nth-of-type(5) > .active {
    border: none;
    border-bottom: none;
    border-left: 2px solid #F6F3FA;
    border-right: none;
    /*background: #5B585F;*/
    color: #F6F3FA;
}

.quests > .quest > .inactive {
    border-bottom: 4px solid #F6F3FA;
    border-left: 2px solid #F6F3FA;
    border-right: 2px solid #F6F3FA;
    /*background: #343236;*/
    color: #F6F3FA;
}

.quests > .quest:nth-of-type(1) > .inactive {
    border: none;
    border-bottom: 4px solid #F6F3FA;
    border-left: none;
    border-right: 2px solid #F6F3FA;
    /*background: #343236;*/
    color: #F6F3FA;
}

.quests > .quest:nth-of-type(5) > .inactive {
    border: none;
    border-bottom: 4px solid #F6F3FA;
    border-left: 2px solid #F6F3FA;
    border-right: none;
    /*background: #343236;*/
    color: #F6F3FA;
}

.questWrapper {
    /*position: absolute;*/
    /* top: 50%; */
    /* transform: translateY(-50%); */
    cursor: pointer;
    /*padding-bottom: 3rem;*/
    /*padding-top: 2.5vh;*/
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #343236;
}
</style>
