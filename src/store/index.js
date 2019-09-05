import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stepOne: true, //intro
        lobbyStep: false,
        stepTwo: false, //playerInfo
        questInfoDisplay: false,
        proposeMissionParty: false,
    },
    getters: {
        getStepOne: state => {
            return state.stepOne;
        },
        getLobbyStep: state => {
            return state.lobbyStep;
        },
        getStepTwo: state => {
            return state.stepTwo;
        },
        getQuestInfoDisplay: state => {
            return state.questInfoDisplay;
        },
        getProposeMissionParty: state => {
            return state.proposeMissionParty;
        },
    },
    mutations: {
        toggleStepOne: state => {
            state.stepOne = !state.stepOne
        },
        toggleLobbyStep: state => {
            state.lobbyStep = !state.lobbyStep
        },
        toggleStepTwo: state => {
            state.stepTwo = !state.stepTwo
        },
        toggleQuestInfoDisplay: state => {
            state.questInfoDisplay = !state.questInfoDisplay
        },
        toggleProposeMissionParty: state => {
            state.proposeMissionParty = !state.proposeMissionParty
        },
    },
    actions: {
        stepOneToLobbyStep: ({commit}) => {
            commit('toggleStepOne')
            commit('toggleLobbyStep')
        },
        lobbyStepToStepTwo: ({commit}) => {
            commit('toggleLobbyStep')
            commit('toggleStepTwo')
        },
        stepTwoToQuestPhase: ({commit}) => {
            commit('toggleStepTwo')
            commit('toggleQuestInfoDisplay')
            commit('toggleProposeMissionParty')
        },
    }
});