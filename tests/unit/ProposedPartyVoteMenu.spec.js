import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import {assert, match, restore, stub} from "sinon";
import ProposedPartyVoteMenu from "../../src/components/ProposedPartyVoteMenu";
import VueNativeSock from "vue-native-websocket";
import Vuex from "vuex";
import Vue from "vue";

global.WebSocket = require('ws');

let wrapper
let store

Vue.use(Vuex)

let mockServerURL = 'ws://localhost:8080';
Vue.use(VueNativeSock, mockServerURL, {});

describe('ProposedPartyVoteMenu.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                ProposedPartyVoteMenu: {
                    proposedParty: [],
                },
            }
        })
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('should display the vote menu before the player has voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu, {store})

        let voteWrapper = wrapper.find('#vote')

        expect(voteWrapper.isVisible()).to.be.true
    })

    it('should not display the vote menu after the player has voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu, {store})

        let voteWrapper = wrapper.find('#vote')
        wrapper.setData({playerHasVoted: true})

        expect(voteWrapper.isVisible()).to.be.false
    })

    it('should not display the WaitingOnOthers div before the player has voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu, {store})

        let waitingOnOthersWrapper = wrapper.find('#WaitingOnOthers')

        expect(waitingOnOthersWrapper.isVisible()).to.be.false
    })

    it('should display the WaitingOnOthers div after the player has voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu, {store})

        let waitingOnOthersWrapper = wrapper.find('#WaitingOnOthers')
        wrapper.setData({playerHasVoted: true})

        expect(waitingOnOthersWrapper.isVisible()).to.be.true
    })


    it('should call send obj correctly after player has approve voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu, {store})
        const expectedMessage = {
            event: 'PartyApprovalVote',
            partyPassVote: true,
        }

        wrapper.find('#approveButton').trigger('click')

        assert.calledWith(WebsocketService.sendObj, match.any, expectedMessage)
    })

    it('should call send obj correctly after player has approve voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu, {store})
        const expectedMessage = {
            event: 'PartyApprovalVote',
            partyPassVote: false,
        }

        wrapper.find('#denyButton').trigger('click')

        assert.calledWith(WebsocketService.sendObj, match.any, expectedMessage)
    })
})