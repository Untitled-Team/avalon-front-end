<template>
    <div id="questInfo">
        <span class="quest" :key="index" v-for="(quest, index) in quests">
            <Quest :quest="quest" :missionNumber="index+1"/>
        </span>
    </div>
</template>

<script>
    import Quest from "./Quest";

    export default {
        name: 'QuestInfo',
        components: {
            Quest,
        },
        props: ["quests"]
    }
</script>


<style scoped>
    .quest {
        width: 100px;
        height: 100px;
    }

    #questInfo {
        margin: auto;
        display: inline-block;
    }
</style>