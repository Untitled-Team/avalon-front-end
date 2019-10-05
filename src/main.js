import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index.js"
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'ws://157.230.199.219:8000/test', {
    store: store,
    format: 'json',
    reconnection: true,      // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 10000, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 1000, // (Number) how long to initially wait before attempting a new (1000)
});
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
