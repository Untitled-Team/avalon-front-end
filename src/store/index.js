import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stepOne: true, //intro
        stepTwo: false, //playerInfo
        questInfoDisplay: false,
    },
    getters: {
        getStepOne: state => {
            return state.stepOne;
        },
        getStepTwo: state => {
            return state.stepTwo;
        },
        getQuestInfoDisplay: state => {
            return state.questInfoDisplay;
        },
    },
    mutations: {
        toggleStepOne: state => {
            state.stepOne = !state.stepOne
        },
        toggleStepTwo: state => {
            state.stepTwo = !state.stepTwo
        },
        toggleQuestInfoDisplay: state => {
            state.questInfoDisplay = !state.questInfoDisplay
        },
    },
    actions: {
        stepOneToStepTwo: ({commit}) => {
            commit('toggleStepOne')
            commit('toggleStepTwo')
        },
        stepTwoToQuestPhase: ({commit}) => {
            commit('toggleStepTwo')
            commit('toggleQuestInfoDisplay')
        }
    }
});