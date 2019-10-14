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

    window.addEventListener('resize', this.updateStyle);

    // window.addEventListener('scroll', function()  {
    //   // this.updateStyle();
    //
    //   if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
    //     document.body.scrollTop = 0; // For Safari
    //     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //   }
    //
    //   // if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    //   //   document.body.scrollTop = 0; // For Safari
    //   //   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //   // }
    // });

    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });
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