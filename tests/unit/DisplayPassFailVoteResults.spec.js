import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Vuex from "vuex";
import Vue from "vue";
import DisplayPassFailVoteResults from "../../src/components/DisplayPassFailVoteResults";
import {restore, stub,} from "sinon";
import WebsocketService from "../../src/services/WebsocketService";

let wrapper
let store
Vue.use(Vuex)

describe('DisplayPassFailVoteResults.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({state: {DisplayPassFailVoteResults: {passVotes: 0, failVotes: 0}}})
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('should display a pass vote for every pass', () => {
        const expectedPassVotes = 5
        store.state.DisplayPassFailVoteResults.passVotes = expectedPassVotes
        store.state.DisplayPassFailVoteResults.failVotes = 0
        wrapper = shallowMount(DisplayPassFailVoteResults, {store})

        const passVotesWrapper = wrapper.findAll('.pass')

        expect(passVotesWrapper.length).to.equal(expectedPassVotes)
    })

    it('should display a fail vote for every fail', () => {
        const expectedFailVotes = 5
        store.state.DisplayPassFailVoteResults.passVotes = 'anything'
        store.state.DisplayPassFailVoteResults.failVotes = expectedFailVotes
        wrapper = shallowMount(DisplayPassFailVoteResults,{store})

        const passVotesWrapper = wrapper.findAll('.fail')

        expect(passVotesWrapper.length).to.equal(expectedFailVotes)
    })
})
