import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index.js"
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'ws://avalonga.me:8000/test', { store: store, format: 'json' });
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
