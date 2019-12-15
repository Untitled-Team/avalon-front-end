<template>
    <div class="clouds">
        <div class="cloud1">
            <img src="@/assets/cloud1.png">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Clouds',
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .cloud1 {
        position: absolute;
        top: 5%;
        right: 0;
        width: 100%;
        z-index: 3;
    }

    .cloud2 {
        position: absolute;
        top: 8%;
        right: 0;
        width: 100%;
        z-index: 1;
    }
</style>