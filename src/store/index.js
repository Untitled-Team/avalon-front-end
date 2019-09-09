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
        passFailVote: false,
        displayPassFailVoteResults: false,
        assassinVote: false,
        badGuysWin: false,
        goodGuysWin: false,

        //Other State
        players: [],
        nickname: "",
        activeMission: 1,
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
        getPassFailVote: state => {
            return state.passFailVote
        },
        getDisplayPassFailVoteResults: state => {
            return state.displayPassFailVoteResults
        },
        getAssassinVote: state => {
            return state.assassinVote
        },
        getBadGuysWin: state => {
            return state.badGuysWin
        },
        getGoodGuysWin: state => {
            return state.goodGuysWin
        },
        getPlayers: state => {
            return state.players
        },
        getNickname: state => {
            return state.nickname
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
        toggleProposedPartyVote: state => {
            state.proposedPartyVote = !state.proposedPartyVote
        },
        togglePassFailVote: state => {
            state.passFailVote = !state.passFailVote
        },
        toggleDisplayPassFailVoteResults: state => {
            state.displayPassFailVoteResults = !state.displayPassFailVoteResults
        },
        toggleAssassinVote: state => {
            state.assassinVote = !state.assassinVote
        },
        toggleBadGuysWin: state => {
            state.badGuysWin = !state.badGuysWin
        },
        toggleGoodGuysWin: state => {
            state.goodGuysWin = !state.goodGuysWin
        },
        setPlayers: (state, players) => {
            state.players = players
        },
        setNickname: (state, nickname) => {
            state.nickname = nickname
        },
        SOCKET_ONMESSAGE: state => {state},
        SOCKET_ONOPEN: state => {state},
        SOCKET_ONCLOSE: state => {state},
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
        ProposedPartyVoteToPassFailVote: ({commit}) => {
            commit('toggleProposedPartyVote')
            commit('togglePassFailVote')
        },
        PassFailVoteToDisplayPassFailVoteResults: ({commit}) => {
            commit('togglePassFailVote')
            commit('toggleDisplayPassFailVoteResults')
        },
        displayPassFailVoteResultsToProposeMissionParty: ({commit}) => {
            commit('toggleDisplayPassFailVoteResults')
            commit('toggleProposeMissionParty')
        },
        displayPassFailVoteResultsToAssassinVote: ({commit}) => {
            commit('toggleDisplayPassFailVoteResults')
            commit('toggleAssassinVote')
        },
        displayPassFailVoteResultsToBadGuysWin: ({commit}) => {
            commit('toggleDisplayPassFailVoteResults')
            commit('toggleBadGuysWin')
        },
        assassinVoteToGoodGuysWin: ({commit}) => {
            commit('toggleAssassinVote')
            commit('toggleGoodGuysWin')
        },
        assassinVoteToBadGuysWin: ({commit}) => {
            commit('toggleAssassinVote')
            commit('toggleBadGuysWin')
        },
    },
});