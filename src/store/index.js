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
        gameState: {
            intro: true,
            lobby: false,
            playerInfo: false,
            questInfoDisplay: false,
            proposeMissionParty: false,
            proposedPartyVote: false,
            passFailVote: false,
            displayPassFailVoteResults: false,
            assassinVote: false,
            badGuysWin: false,
            goodGuysWin: false,
        },

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
            state.gameState.intro = !state.gameState.intro
        },
        toggleLobbyStep: state => {
            state.gameState.lobby = !state.gameState.lobby
        },
        toggleStepTwo: state => {
            state.gameState.playerInfo = !state.gameState.playerInfo
        },
        toggleQuestInfoDisplay: state => {
            state.gameState.questInfoDisplay = !state.gameState.questInfoDisplay
        },
        toggleProposeMissionParty: state => {
            state.gameState.proposeMissionParty = !state.gameState.proposeMissionParty
        },
        toggleProposedPartyVote: state => {
            state.gameState.proposedPartyVote = !state.gameState.proposedPartyVote
        },
        togglePassFailVote: state => {
            state.gameState.passFailVote = !state.gameState.passFailVote
        },
        toggleDisplayPassFailVoteResults: state => {
            state.gameState.displayPassFailVoteResults = !state.gameState.displayPassFailVoteResults
        },
        toggleAssassinVote: state => {
            state.gameState.assassinVote = !state.gameState.assassinVote
        },
        toggleBadGuysWin: state => {
            console.log('should be printed BAD')
            state.gameState.badGuysWin = !state.gameState.badGuysWin
        },
        toggleGoodGuysWin: state => {
            console.log('should be printed GOOD')
            state.gameState.goodGuysWin = !state.gameState.goodGuysWin
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
        SOCKET_ONMESSAGE: state => {
            state
        },
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
        SOCKET_ONCLOSE: state => {
            state
        },
        SOCKET_ONERROR: state => {
            state
        },
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
