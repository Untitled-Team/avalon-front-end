<template>
    <div id="questInfo" class="section">
        <div class="columns">
            <div class="quest column " :key="index" v-for="(quest, index) in quests">
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
    }
</script>

<style scoped>
    .column {
        padding: 0;
    }
</style>