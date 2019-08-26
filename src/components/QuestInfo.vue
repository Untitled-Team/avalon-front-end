<template>
    <div id="questInfo">
        <span class="quest" :key="quest" v-for="quest in quests">
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
                quests: [{},{},{},{},{},]
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