<template>
    <div class="clouds">
        <div class="cloud3">
            <img src="@/assets/cloud3.png">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cloud3',
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .cloud3 img {
        animation: float 69s linear infinite;
        width: 25%;
    }

    @-webkit-keyframes float {
        0% {
            transform: translate(-250%);
        }

        20% {
            transform: translate(-400%);
        }
        20.000001% {
            transform: translate(400%);
        }

        100% {
            transform: translate(-250%);
        }
    }
</style>