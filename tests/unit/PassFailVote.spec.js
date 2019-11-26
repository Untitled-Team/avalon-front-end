import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import {assert, stub, match, restore} from "sinon";
import Vuex from "vuex";
import Vue from "vue";
import PassFailVote from "../../src/components/PassFailVote";
import VueNativeSock from "vue-native-websocket";

let wrapper

global.WebSocket = require('ws');

Vue.use(VueNativeSock, 'ws://localhost:8080', {});
let store

Vue.use(Vuex)

describe('PassFailVote.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                nickname: "",
                ProposedPartyVoteMenu: {
                    proposedParty: []
                }
            },
        })
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('displays each party member', () => {
        let expectedParty = ['john', 'johan', 'johnny', 'sue'];
        store.state.ProposedPartyVoteMenu.proposedParty = expectedParty
        wrapper = shallowMount(PassFailVote, {store})

        expectedParty.forEach((player) => {
            expect(wrapper.text()).to.include(player, `${player} not in the wrapper!`)
        })
    })

    it('should call sendObj correctly when player votes pass.', () => {
        wrapper = shallowMount(PassFailVote, {store})
        let expectedMessage = {
            event: 'QuestVote',
            questPassVote: true,
        }

        wrapper.find('.passButton').trigger('click')

        assert.calledWith(
            WebsocketService.sendObj,
            match.any,
            expectedMessage)
    })

    it('should call sendObj correctly when player votes fail.', () => {
        wrapper = shallowMount(PassFailVote, {store})
        let expectedMessage = {
            event: 'QuestVote',
            questPassVote: false,
        }

        wrapper.find('.failButton').trigger('click')

        assert.calledWith(
            WebsocketService.sendObj,
            match.any,
            expectedMessage)
    })

    it('should not display the ready message before player has voted if they\'re in the party.', () => {
        store.state.nickname = 'john'
        store.state.ProposedPartyVoteMenu.proposedParty = ['john']
        wrapper = shallowMount(PassFailVote, {store})

        const waitingWrapper = wrapper.find('#WaitingOnOthers')

        expect(waitingWrapper.isVisible()).to.be.false
    })

    it('should display the ready message before player has voted if they\'re not in the party', () => {
        store.state.nickname = 'john'
        store.state.ProposedPartyVoteMenu.proposedParty = ['sandy']
        wrapper = shallowMount(PassFailVote, {store})

        const waitingWrapper = wrapper.find('#WaitingOnOthers')

        expect(waitingWrapper.isVisible()).to.be.true
    })
})
