import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stepOne: true, //intro
        lobbyStep: false,
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
        lobbyNicknames: []
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
        getPlayerInfoStuff: state => {
            return state.playerInfoStuff;
        },
        getLobbyNicknames: state => {
            return state.lobbyNicknames
        }
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
    },
    actions: {
        // playerInfoMessage: function (context, playerInfoMessage) {
        //     console.log("HERE" + JSON.stringify(playerInfoMessage));
        //     this.state.playerInfoStuff = playerInfoMessage; //does this need done with a mutation?
        //     //this.dispatch("lobbyStepToStepTwo")
        // },
        allPlayersReadyMessage: function (context, allPlayersReadyMessage) {
            this.state.missionLeader = allPlayersReadyMessage.missionLeader
            this.dispatch("stepTwoToQuestPhase")
        },


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
        },
    }
});