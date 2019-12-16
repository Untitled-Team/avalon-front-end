<template>
    <div class="clouds">
        <Cloud1 class="cloud1"/>
        <Cloud2 class="cloud2"/>
        <Cloud3 class="cloud3"/>
        <Cloud4 class="cloud4"/>
        <Cloud5 class="cloud5"/>
        <Cloud6 class="cloud6"/>
        <Cloud7 class="cloud7"/>
    </div>
</template>

<script>
    import Cloud1 from "./Cloud1"
    import Cloud2 from "./Cloud2"
    import Cloud3 from "./Cloud3"
    import Cloud4 from "./Cloud4"
    import Cloud5 from "./Cloud5"
    import Cloud6 from "./Cloud6"
    import Cloud7 from "./Cloud7"

    export default {
        name: 'Clouds',
        components: {
            Cloud1,
            Cloud2,
            Cloud3,
            Cloud4,
            Cloud5,
            Cloud6,
            Cloud7
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    @mixin cloud($top, $z-index) {
        position: absolute;
        top: $top;
        right: 0;
        width: 100%;
        z-index: $z-index;
    }

    .cloud1 {
        @include cloud(5%, 3);
    }

    .cloud2 {
        @include cloud(10%, 1);
        opacity: .9;
    }

    .cloud3 {
        @include cloud(-1%, 1);
        opacity: .85;
    }

    .cloud4 {
        @include cloud(8%, 3);
    }

    .cloud5 {
        @include cloud(11%, 1);
        opacity: .85;
    }

    .cloud6 {
        @include cloud(3%, 3);
        opacity: .8;
    }

    .cloud7 {
        @include cloud(2%, 3);
    }
</style>