<template>
    <div id="questInfo">
        <div class="columns is-mobile is-paddingless is-marginless missions">
            <div class="column is-one-fifth is-marginless is-paddingless quest" :key="index"
                 v-for="(quest, index) in missions">
                <Quest :quest="quest" :missionNumber="index+1" :quests="missions" class="index"/>
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
        computed: {
            missions: function () {
                return this.$store.state.missions
            }
        }
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

    .missions {
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
