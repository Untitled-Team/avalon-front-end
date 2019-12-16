<template>
    <div class="clouds">
        <div class="cloud2">
            <img src="@/assets/cloud2.png">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cloud2',
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .cloud2 img {
        animation: float 12s linear infinite;
        width: 30%;
    }

    @-webkit-keyframes float {
        0% {
            transform: translate(-100%);
        }

        30% {
            transform: translate(-280%);
        }
        30.000001% {
            transform: translate(350%);
        }

        100% {
            transform: translate(-100%);
        }
    }
</style>