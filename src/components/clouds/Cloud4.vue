<template>
    <div class="clouds">
        <div class="cloud4">
            <img src="@/assets/cloud4.png">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cloud4',
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .cloud4 img {
        animation: float 42s linear infinite;
        width: 38%;
    }

    @-webkit-keyframes float {
        0% {
            transform: translate(-90%);
        }

        30% {
            transform: translate(-400%);
        }
        30.000001% {
            transform: translate(400%);
        }

        100% {
            transform: translate(-90%);
        }
    }
</style>