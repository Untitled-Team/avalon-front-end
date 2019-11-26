import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import Lobby from "../../src/components/Lobby";
import {assert, restore, stub} from "sinon";
import Vuex from "vuex";
import Vue from "vue";

let wrapper
let store

Vue.use(Vuex)

describe('Lobby.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({state: {roomId: "", players: ["", "", "", "", ""]}})
        restore()
    })

    it('displays the lobby ID', () => {
        let expectedRoomId = "690 blaze it";
        store.state.roomId = expectedRoomId
        wrapper = shallowMount(Lobby, {store})
        let totalPlayersWrapper = wrapper.find('.roomId')

        expect(totalPlayersWrapper.text()).to.contain(`${expectedRoomId}`)
    })

    it('displays each player in the players prop', () => {
        let expectedPlayers = ["steve johannesberg", "ronald blump"];
        store.state.players  = expectedPlayers
        wrapper = shallowMount(Lobby, {store})

        expectedPlayers.forEach(player => {
            expect(wrapper.text()).to.contain(`${player}`)
        })
    })

    it('should show warning when less than 5 players in lobby', () => {
        let expectedPlayers = ["1", "2", "3", "4"]
        store.state.players  = expectedPlayers
        wrapper = shallowMount(Lobby, {store})

        const warningWrapper = wrapper.find('#warning')

        expect(warningWrapper.exists()).to.be.true
    });

    it('should show warning when greater than 10 players in lobby', () => {
        let expectedPlayers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
        store.state.players  = expectedPlayers
        wrapper = shallowMount(Lobby, {store})

        const warningWrapper = wrapper.find('#warning')

        expect(warningWrapper.exists()).to.be.true
    });

    it('should not show warning when 5 players in lobby', () => {
        let expectedPlayers = ["1", "2", "3", "4", "5"]
        store.state.players  = expectedPlayers
        wrapper = shallowMount(Lobby, {store})

        const warningWrapper = wrapper.find('#warning')

        expect(warningWrapper.exists()).to.be.false
    });

    it('should not show warning when 10 players in lobby', () => {
        let expectedPlayers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        store.state.players  = expectedPlayers
        wrapper = shallowMount(Lobby, {store})

        const warningWrapper = wrapper.find('#warning')

        expect(warningWrapper.exists()).to.be.false
    });

    describe('lobby ready form', () => {
        beforeEach(() => {
            stub(WebsocketService, 'sendObj')
        })

        it('should not sendObj with less than 5 players in the lobby', () => {
            let expectedPlayers = ["", "", "", ""]
            store.state.players  = expectedPlayers
            wrapper = shallowMount(Lobby, {store})

            const lobbyReadyWrapper = wrapper.find('#lobbyReadyForm')
            lobbyReadyWrapper.trigger("submit.prevent")

            assert.notCalled(WebsocketService.sendObj)
        });

        it('should not sendObj with greater than 10 players in the lobby', () => {
            let expectedPlayers = ["", "", "", "", "", "", "", "", "", "", ""]
            store.state.players  = expectedPlayers
            wrapper = shallowMount(Lobby, {store})

            const lobbyReadyWrapper = wrapper.find('#lobbyReadyForm')
            lobbyReadyWrapper.trigger("submit.prevent")

            assert.notCalled(WebsocketService.sendObj)
        });

        it('should sendObj with 5 players in the lobby', () => {
            let expectedPlayers = ["", "", "", "", ""]
            store.state.players  = expectedPlayers
            wrapper = shallowMount(Lobby, {store})

            const lobbyReadyWrapper = wrapper.find('#lobbyReadyForm')
            lobbyReadyWrapper.trigger("submit.prevent")

            assert.calledOnce(WebsocketService.sendObj)
        });

        it('should sendObj with 10 players in the lobby', () => {
            let expectedPlayers = ["", "", "", "", "", "", "", "", "", ""]
            store.state.players  = expectedPlayers
            wrapper = shallowMount(Lobby, {store})

            const lobbyReadyWrapper = wrapper.find('#lobbyReadyForm')
            lobbyReadyWrapper.trigger("submit.prevent")

            assert.calledOnce(WebsocketService.sendObj)
        });
    })
})