<template>
  <div :style=objectStyle data-vue100vh>
    <slot></slot>
  </div>
</template>
<script>
import convertStyle from './convertStyle/convertStyle'
export default {
  name: 'vue100vh',
  props:['css'],
  data () {
    return {
      objectStyle: {}
    }
  },
  mounted () {
    this.updateStyle();

    // window.addEventListener('resize', function() {
    //   console.log(window.innerHeight);
    //   this.updateStyle
    // });
    //
    //
    // document.addEventListener('resize', function() {
    //   console.log(window.innerHeight);
    //   this.updateStyle
    // });

    // document.addEventListener('gesturestart', function (e) {
    //   e.preventDefault();
    // });
    //
    // var drawDebouncedEvent = _.debounce(function(div){
    //   debounceColor = globalColor;
    // }, frequency*4, {leading:false, trailing:true});

    document.addEventListener('touchmove', _.debounce(function(e) {
      console.log("TOUCHMOVE");
      e.preventDefault();
    }, 200, {leading: false, trailing: true}));


    // document.addEventListener('touchmove', function(event) {
    //   event = event.originalEvent || event;
    //   if (event.scale !== 1) {
    //     console.log("HERE");
    //     event.preventDefault();
    //     event.stopPropagation();
    //   }
    //   console.log("HERE - " + event.isDefaultPrevented);
    // }, { passive: false });
    //
    // document.addEventListener('gesturestart', function (e) {
    //   console.log("GESTURE");
    //   if(e.preventDefault){
    //     e.preventDefault();
    //   }else{
    //     e.returnValue = false;
    //   }
    //   // e.stopPropagation();
    //   return false;
    // }, false);

    // document.addEventListener('gesturemove', function (e) {
    //   console.log("GESTURE MOVE");
    //   e.preventDefault();
    // }, false);
    //
    // document.addEventListener('gestureend', function (e) {
    //   console.log("GESTUREEND");
    //   e.preventDefault();
    // }, false);
  },
  destroyed () {
    window.removeEventListener('resize', this.updateStyle);
    window.removeEventListener('gesturestart', function (event) {
      event.preventDefault();
    }, false);
  },
  methods:{
    prevent (event) {
      event.preventDefault();
    },
    updateStyle () {
      const convertedStyle = convertStyle(this.css, this.getWindowHeight());
      this.objectStyle = convertedStyle;
    },
    getWindowHeight(){
      return window.innerHeight;
    }
  }
}
</script>