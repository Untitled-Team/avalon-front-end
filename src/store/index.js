import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stepOne: true, //intro
        stepTwo: false, //playerInfo
        questInfoDisplay: false,

        playerInfoStuff: {
            good: false,
            bad: false,
            merlin: false,
            assassin: false,
            badGuys: []
        },
        missionLeader: false,
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
        playerInfoStuff: state => {
            return state.playerInfoStuff;
        }
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
        playerInfoMessage: function (context, playerInfoMessage) {
            console.log("HERE" + JSON.stringify(playerInfoMessage));
            this.state.playerInfoStuff = playerInfoMessage; //does this need done with a mutation?

            this.dispatch("stepOneToStepTwo")
        },
        allPlayersReadyMessage: function (context, allPlayersReadyMessage) {
            this.state.missionLeader = allPlayersReadyMessage.missionLeader
            this.dispatch("stepTwoToQuestPhase")
        },
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