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
        animation: float 11s linear infinite;
        width: 40%;
    }

    @-webkit-keyframes float {
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
</style>