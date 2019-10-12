<template>
    <div id="questInfo">
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

<style lang="scss" scoped>
    @import "../styles/variables";

    #playerInfo {
        margin: $myMarg;
    }

    .column {
        padding: 0;
    }

    .quests {
        height: 100%;
    }

    .active {
        color: #F6F3FA;
    }

    .questWrapper {
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: $incomplete;
    }
</style>
