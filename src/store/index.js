import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stepOne: true, //intro
        stepTwo: false //playerInfo
    },
    getters: {
        getStepOne: state => {
            return state.stepOne;
        },
        getStepTwo: state => {
            return state.stepTwo;
        },
    },
    mutations: {
        toggleStepOne: state => {
            state.stepOne = !state.stepOne
        },
        toggleStepTwo: state => {
            state.stepTwo = !state.stepTwo
        },
    },
    actions: {
        stepOneToStepTwo: ({commit}) => {
            commit('toggleStepOne')
            commit('toggleStepTwo')
        }
    }
});