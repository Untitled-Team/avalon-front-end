<template>
    <div id="questInfo" class="section">
        <div class="columns is-mobile">
            <div class="column is-full permanentPlayerInfo mediumText">
                <div class="level is-mobile">
                    <span class="level-left level-item is-mobile">{{ nickname }}</span>
                    <span class="level-right level-item is-mobile">{{ character }}</span>
                </div>
            </div>
        </div>
        <div class="columns is-mobile">
            <div class="quest column" :key="index" v-for="(quest, index) in quests">
                <Quest :quest="quest" :missionNumber="index+1"/>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../store/index.js"
    import Quest from "./Quest";

    export default {
        name: 'QuestInfo',
        components: {
            Quest,
        },
        props: ["quests"],
        computed: {
            nickname: function () {
                return store.getters.getNickname
            },
            character: function () {
                return store.getters.getCharacter
            },
        }
    }
</script>

<style scoped>
    .column {
        padding: 0;
    }

    .permanentPlayerInfo {
        background: #c0912a;
        border: 3px solid #b0912a;
        /*background: linear-gradient(180deg, #c0912a 40%, #b0912a 100%);*/
    }
</style>