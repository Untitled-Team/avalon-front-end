<template>
    <div id="questInfo">
        <span class="quest" :key="quest.id" v-for="quest in quests">
            <Quest :party-size="5" />
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
        data: function () {
            return {
                quests: [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},]
            }
        }
    }
</script>


<style scoped>
    .quest {
        width: 100px;
        height: 100px;
    }
</style>