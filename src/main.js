import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index.js"
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
    id: 'UA-154860861-1',
    router
});

Vue.use(VueNativeSock, 'wss://backend.avalonga.me/test', {
    store: store,
    format: 'json',
    reconnection: true,      // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 10000, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 1000, // (Number) how long to initially wait before attempting a new (1000)
});
Vue.use(Buefy);

new Vue({
    // router,
    store,
    render: h => h(App)
}).$mount('#app');
