<template>
    <div id="notCurrentMissionData">
        ACTIVE MISSION NOT CURRENT MISSION!
    </div>
</template>

<script>
    import store from "../store/index.js"

    export default {
        name: 'NotCurrentMissionData',
        props: ["quests"]
    }
</script>


<style scoped>
</style>