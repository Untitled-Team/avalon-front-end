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
        animation: float 12s linear infinite;
        width: 15%;
        opacity: .85;
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