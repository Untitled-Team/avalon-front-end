import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //Game Phase
        stepOne: true, //intro
        lobbyStep: false,
        stepTwo: false, //playerInfo
        questInfoDisplay: false,
        proposeMissionParty: false,
        proposedPartyVote: false,

        //Other State
        players: [],
        nickname: "",
    },
    getters: {
        getStepOne: state => {
            return state.stepOne
        },
        getLobbyStep: state => {
            return state.lobbyStep
        },
        getStepTwo: state => {
            return state.stepTwo
        },
        getQuestInfoDisplay: state => {
            return state.questInfoDisplay
        },
        getProposeMissionParty: state => {
            return state.proposeMissionParty
        },
        getProposedPartyVote: state => {
            return state.proposedPartyVote
        },
        getPlayers: state => {
            return state.players
        },
        getNickname: state => {
            return state.nickname
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
        toggleProposeMissionParty: state => {
            state.proposeMissionParty = !state.proposeMissionParty
        },
        toggleProposedPartyVote: state => {
            state.proposedPartyVote = !state.proposedPartyVote
        },
        setPlayers: (state, players) => {
            state.players = players
        },
        setNickname: (state, nickname) => {
            state.nickname = nickname
        }
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
        ToggleProposeMissionPartyAndProposedPartyVote: ({commit}) => {
            commit('toggleProposeMissionParty')
            commit('toggleProposedPartyVote')
        },
    },
});