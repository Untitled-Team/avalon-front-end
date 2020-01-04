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
        animation: float 32s linear infinite;
        width: 40%;
    }

    @-webkit-keyframes float {
        0% {
            transform: translate(50%);
        }

        70% {
            transform: translate(-170%);
        }
        70.000001% {
            transform: translate(180%);
        }

        100% {
            transform: translate(50%);
        }
    }
</style>