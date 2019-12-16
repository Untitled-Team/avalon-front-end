<template>
    <div class="clouds">
        <div class="cloud5">
            <img src="@/assets/cloud5.png">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cloud5',
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .cloud5 img {
        animation: float 10s 5s linear infinite;
        width: 20%;
    }

    @-webkit-keyframes float {
        0% {
            transform: translate(-300%);
        }

        30% {
            transform: translate(-370%);
        }
        30.000001% {
            transform: translate(370%);
        }

        100% {
            transform: translate(-300%);
        }
    }
</style>