<template>
    <div class="clouds">
        <div class="cloud7">
            <img src="@/assets/cloud3.png">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cloud7',
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .cloud7 img {
        animation: float 30s linear infinite;
        width: 38%;
    }

    @-webkit-keyframes float {
        0% {
            transform: translate(-70%);
        }

        30% {
            transform: translate(-180%);
        }
        30.000001% {
            transform: translate(240%);
        }

        100% {
            transform: translate(-70%);
        }
    }
</style>