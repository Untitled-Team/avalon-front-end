import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {
        //Game Phase/CurrentScreen
        Intro: true, //intro
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

        //General State
        players: [],
        nickname: "",
        roomId: "",
        character: "",
        activeMission: 1,
        currentMission: 1,
        lastEventId: null,
        badGuys: [],
        currentMissionLeader: "",
        missions: [],

        playerInfo: {
            ready: false
        },
    },
    getters: {
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
        getCharacterFormatted: state => {
            if (state.character == "NormalGoodGuy") {
                return "Good Guy"
            } else if (state.character == "NormalBadGuy") {
                return "Bad Guy"
            }
            return state.character
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
        setRoomId: (state, roomId) => {
            state.roomId = roomId
        },
        setActiveMission: (state, activeMission) => {
            state.activeMission = activeMission
        },
        setLastEventId: (state, event) => {
            state.lastEventId = event
        },
        SOCKET_ONMESSAGE: state => {state},
        SOCKET_ONOPEN: state => {
            if (state.nickname && state.roomId) {
                Vue.prototype.$socket.sendObj({
                    event: "Reconnect",
                    nickname: state.nickname,
                    roomId: state.roomId,
                    lastMessageId: state.lastEventId
                });                
            }
        },
        SOCKET_ONCLOSE: state => {state},
        SOCKET_ONERROR: state => {state},
        SOCKET_RECONNECT: state => {
            Vue.prototype.$socket.sendObj({
                event: "Reconnect",
                nickname: state.nickname,
                roomId: state.roomId,
                lastMessageId: state.lastEventId
            });
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
    plugins: [vuexLocal.plugin]
});
