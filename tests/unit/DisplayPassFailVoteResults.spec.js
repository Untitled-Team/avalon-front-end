import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Vuex from "vuex";
import Vue from "vue";
import DisplayPassFailVoteResults from "../../src/components/DisplayPassFailVoteResults";
import {restore, stub, useFakeTimers} from "sinon";
import WebsocketService from "../../src/services/WebsocketService";

let wrapper
let store
let clock
Vue.use(Vuex)

describe('DisplayPassFailVoteResults.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({state: {DisplayPassFailVoteResults: {passVotes: 0, failVotes: 0}}})
        restore()
        stub(WebsocketService, 'sendObj')
        clock = useFakeTimers();
    })

    afterEach(() => {
        clock.restore();
    })

    // it('should display a pass vote for every pass', () => {
    //     const expectedPassVotes = 5
    //     store.state.DisplayPassFailVoteResults.passVotes = expectedPassVotes
    //     store.state.DisplayPassFailVoteResults.failVotes = 0
    //     wrapper = shallowMount(DisplayPassFailVoteResults, {store})
    //
    //     setTimeout((() => console.log('hyo')),2000)
    //     clock.tick(1500 * 5 + 100);
    //     const passVotesWrapper = wrapper.findAll('.pass')
    //
    //     expect(passVotesWrapper.length).to.equal(expectedPassVotes)
    // })
    //
    // it('should display a fail vote for every fail', () => {
    //     const expectedFailVotes = 5
    //     store.state.DisplayPassFailVoteResults.passVotes = 0
    //     store.state.DisplayPassFailVoteResults.failVotes = expectedFailVotes
    //     wrapper = shallowMount(DisplayPassFailVoteResults, {store})
    //
    //     clock.tick(5555555555555555555555555);
    //     const failVotesWrapper = wrapper.findAll('.fail')
    //
    //     expect(failVotesWrapper.length).to.equal(expectedFailVotes)
    // })
})
