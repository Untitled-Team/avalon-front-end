import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        connected: false,
    },
    // getters: {
    //     words(state) {
    //         if (state.game.solution) {
    //             return Object.keys(state.game.solution);
    //         }
    //         return [];
    //     },
    // },
    mutations: {
        SOCKET_CONNECT(state) {
            state.connected = true;
            console.log("connected :)")
        },
        SOCKET_DISCONNECT(state) {
            state.connected = false;
        },
    },
});