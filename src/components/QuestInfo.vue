<template>
    <div id="questInfo">
        <span class="quest" :key="quest" v-for="quest in missions">
            <Quest :party-size="quest.numberOfAdventurers" :pass="quest.pass" :votes="quest.votes"
                   :party="quest.players"/>
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
        props: ["missions"]
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
        padding: 15px;
    }
</style>