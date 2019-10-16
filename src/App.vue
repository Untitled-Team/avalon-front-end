<template>
    <div id="app">
        <head>
            <!DOCTYPE html>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <Avalon/>
    </div>
</template>

<script>
    import Avalon from "./views/Avalon"

    export default {
        name: "App",
        components: {
            Avalon,
        },
        actions: {
            connect: function () {
            },
        }
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
    -webkit-overflow-scrolling: touch; /* enables “momentum” (smooth) scrolling */
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
    
    /*.button::-moz-focus-inner {*/
    /*    border: 0;*/
    /*    padding: 0;*/
    /*}*/

    /*.button {*/
    /*    display: inline-block;*/
    /*    *display: inline;*/
    /*    zoom: 1;*/
    /*    padding: 6px 20px;*/
    /*    margin: 0;*/
    /*    cursor: pointer;*/
    /*    border: 1px solid #bbb;*/
    /*    overflow: visible;*/
    /*    font: bold 8px Oxygen, Hellovetica, arial;*/
    /*    text-decoration: none;*/
    /*    white-space: nowrap;*/
    /*    color: #555;*/

    /*    background-color: #ddd;*/
    /*    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));*/
    /*    background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));*/
    /*    background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));*/
    /*    background-image: -ms-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));*/
    /*    background-image: -o-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));*/
    /*    background-image: linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));*/

    /*    -webkit-transition: background-color .2s ease-out;*/
    /*    -moz-transition: background-color .2s ease-out;*/
    /*    -ms-transition: background-color .2s ease-out;*/
    /*    -o-transition: background-color .2s ease-out;*/
    /*    transition: background-color .2s ease-out;*/
    /*    background-clip: padding-box; !* Fix bleeding *!*/
    /*    -moz-border-radius: 3px;*/
    /*    -webkit-border-radius: 3px;*/
    /*    border-radius: 3px;*/
    /*    -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;*/
    /*    -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;*/
    /*    box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;*/
    /*    text-shadow: 0 1px 0 rgba(255, 255, 255, .9);*/

    /*    -webkit-touch-callout: none;*/
    /*    -webkit-user-select: none;*/
    /*    -khtml-user-select: none;*/
    /*    -moz-user-select: none;*/
    /*    -ms-user-select: none;*/
    /*    user-select: none;*/
    /*}*/

    /*.button:hover {*/
    /*    background-color: #eee;*/
    /*    color: #555;*/
    /*}*/

    /*.button:active {*/
    /*    background: #e9e9e9;*/
    /*    position: relative;*/
    /*    top: 1px;*/
    /*    text-shadow: none;*/
    /*    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;*/
    /*    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;*/
    /*    box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;*/
    /*}*/

</style>
