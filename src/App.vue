<template>
    <div id="app">
        <head>
            <!DOCTYPE html>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <Avalon/>
        <div id="landscapeContent">
            Please turn your phone back to the upright position.
        </div>
    </div>
</template>

<script>
    import Avalon from "./views/Avalon"

    export default {
        name: "App",
        components: {
            Avalon,
        },
        mounted() {
            window.addEventListener("orientationchange", function() {
                setTimeout(function() {
                    document.body.style.height = window.innerHeight + 'px';
                    // document.body.style.height = "100%";
                }, 500)
                setTimeout(function() {
                    document.body.style.height = "100%";
                }, 600)
            });
        },
    }
</script>

<style>
@font-face {
    font-family: "Fairfax";
    src: url("./assets/Fairfax.ttf");
}

html,
body {
    height: 100%;
    overflow: auto;
}
body {
    position: relative;
    margin: 0 auto;
    padding: 2rem;
    max-width: 1200px;
    box-sizing: border-box;
    background: #31A2F2;
    color: #fff;
    overscroll-behavior-y: none;
}

#app {
    overflow-y: scroll;
    background-color: #5B585F;
    font: bold 8px Fairfax, Fairfax;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2f3026;
        font-size-adjust: 1;
    }

    .biggerText {
        font-size: 4em;
    }

    .bigText {
        font-size: 2em;
    }

    .mediumText {
        font-size: 1.7em;
    }

    #landscapeContent {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        font-size: 2rem;
        color: whitesmoke;
        background: #31A2F2;
    }

@media (orientation: portrait) {
    #landscapeContent {
        display: none;
    }
}

</style>
