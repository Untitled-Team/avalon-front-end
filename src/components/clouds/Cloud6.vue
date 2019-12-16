<template>
    <div class="clouds">
        <div class="cloud6">
            <img src="@/assets/cloud6.png">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cloud6',
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .cloud6 img {
        animation: float 30s linear infinite;
        width: 50%;
    }

    @-webkit-keyframes float {
        0% {
            transform: translate(50%);
        }

        70% {
            transform: translate(-140%);
        }
        70.000001% {
            transform: translate(150%);
        }

        100% {
            transform: translate(50%);
        }
    }
</style>