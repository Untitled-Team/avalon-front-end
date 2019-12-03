import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const getDefaultState = () => {
    return {
        activeMission: 1,
        badGuys: [],
        character: "",
        currentMission: 1,
        currentMissionLeader: "",
        lastEventId: null,
        missions: [],
        nickname: "",
        players: [],
        roomId: "",

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
        assassinVote: {
            assassinVoteData: {},
        },
        ProposedPartyVoteMenu: {
            proposedParty: [],
            playerHasVoted: false
        },
        DisplayPassFailVoteResults: {
            passVotes: 0,
            failVotes: 0,
        },
        Winner: {
            gameOverData: {},
        },
        PassFailVote: {
            playerHasVoted: false
        },
    }
}

export default new Vuex.Store({
    state: getDefaultState(),
    getters: {
        getNickname: state => {
            return state.nickname
        },
        getCharacterFormatted: state => {
            if (state.character === "NormalGoodGuy") {
                return "Knight of Arthur"
            } else if (state.character === "NormalBadGuy") {
                return "Warlock"
            }
            return state.character
        },
    },
    mutations: {
        resetState: state => {
            Object.assign(state, getDefaultState())
            location.reload()
        },
        setNickname: (state, nickname) => {
            state.nickname = nickname
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
            if (state.nickname && state.roomId) {
                Vue.prototype.$socket.sendObj({
                    event: "Reconnect",
                    nickname: state.nickname,
                    roomId: state.roomId,
                    lastMessageId: state.lastEventId
                });
            }
        }
    },
    actions: {
        introToLobbyStep: ({state}) => {
            state.gameState.intro = !state.gameState.intro
            state.gameState.lobby = !state.gameState.lobby
        },
        lobbyStepToStepTwo: ({state}) => {
            state.gameState.lobby = !state.gameState.lobby
            state.gameState.playerInfo = !state.gameState.playerInfo
        },
        stepTwoToQuestPhase: ({state}) => {
            //This means that we're already past the ProposeMissionParty state so we jump straight to ProposedPartyVote
            if (state.ProposedPartyVoteMenu.proposedParty.length >= 1) {
                state.gameState.playerInfo = false
                state.gameState.questInfoDisplay = true
                state.gameState.proposedPartyVote = true
            } else {
                state.gameState.playerInfo = false
                state.gameState.questInfoDisplay = true
                state.gameState.proposeMissionParty = true
            }
        },
        ToggleProposeMissionPartyAndProposedPartyVote: ({state}) => {
            state.gameState.proposeMissionParty = !state.gameState.proposeMissionParty
            state.gameState.proposedPartyVote = !state.gameState.proposedPartyVote
        },
        ProposedPartyVoteToPassFailVote: ({state}) => {
            state.gameState.proposedPartyVote = !state.gameState.proposedPartyVote
            state.gameState.passFailVote = !state.gameState.passFailVote
        },
        PassFailVoteToDisplayPassFailVoteResults: ({state}) => {
            state.gameState.passFailVote = !state.gameState.passFailVote
            state.gameState.displayPassFailVoteResults = !state.gameState.displayPassFailVoteResults
        },
        displayPassFailVoteResultsToProposeMissionParty: ({state}) => {
            state.gameState.displayPassFailVoteResults = !state.gameState.displayPassFailVoteResults
            state.gameState.proposeMissionParty = !state.gameState.proposeMissionParty
        },
        displayPassFailVoteResultsToAssassinVote: ({state}) => {
            state.gameState.displayPassFailVoteResults = !state.gameState.displayPassFailVoteResults
            state.gameState.assassinVote = !state.gameState.assassinVote
        },
        displayPassFailVoteResultsToBadGuysWin: ({state}) => {
            state.gameState.displayPassFailVoteResults = !state.gameState.displayPassFailVoteResults
            state.gameState.badGuysWin = !state.gameState.badGuysWin
        },
        assassinVoteToGoodGuysWin: ({state}) => {
            state.gameState.assassinVote = !state.gameState.assassinVote
            state.gameState.goodGuysWin = !state.gameState.goodGuysWin
        },
        assassinVoteToBadGuysWin: ({state}) => {
            state.gameState.assassinVote = !state.gameState.assassinVote
            state.gameState.badGuysWin = !state.gameState.badGuysWin
        },
    },
    plugins: [vuexLocal.plugin]
});
