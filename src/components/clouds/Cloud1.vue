<template>
    <div class="clouds">
        <div class="cloud1">
            <img src="@/assets/cloud1.png">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cloud1',
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .cloud1 img {
        animation: from-start1 8s linear infinite;
        width: 30%;
    }

    @-webkit-keyframes from-start1 {
        0% {
            transform: translate(-40%);
        }

        30% {
            transform: translate(-280%);
        }
        30.000001% {
            transform: translate(350%);
        }

        100% {
            transform: translate(-40%);
        }
    }

    .cloud2 img {
        animation: from-start2 6s linear infinite;
    }

    @-webkit-keyframes from-start2 {
        0% {
            transform: translate(-40%);
        }

        75% {
            transform: translate(-280%);
        }

        75.000001% {
            transform: translate(70%);
        }

        100% {
            transform: translate(-40%);
        }
    }
</style>