import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Vuex from "vuex";
import Vue from "vue";
import DisplayPassFailVoteResults from "../../src/components/DisplayPassFailVoteResults";
import {restore, stub, match, assert, useFakeTimers} from "sinon";
import WebsocketService from "../../src/services/WebsocketService";

let wrapper
let clock
Vue.use(Vuex)

describe('DisplayPassFailVoteResults.vue', () => {
    beforeEach(() => {
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('should display a pass vote for every pass', () => {
        const expectedPassVotes = 5
        wrapper = shallowMount(
            DisplayPassFailVoteResults,
            {
                propsData: {
                    passVotes: expectedPassVotes,
                    failVotes: 124
                }
            })

        const passVotesWrapper = wrapper.findAll('.pass')

        expect(passVotesWrapper.length).to.equal(expectedPassVotes)
    })

    it('should display a fail vote for every fail', () => {
        const expectedFailVotes = 5
        wrapper = shallowMount(
            DisplayPassFailVoteResults,
            {
                propsData: {
                    passVotes: 'doesn\'t matter at all literally',
                    failVotes: expectedFailVotes
                }
            })

        const passVotesWrapper = wrapper.findAll('.fail')

        expect(passVotesWrapper.length).to.equal(expectedFailVotes)
    })

    // it('should call sendObj correctly (after 5 seconds)', () => {
    //     wrapper = shallowMount(DisplayPassFailVoteResults)
    //
    //     const expectedMessage = {
    //         event: "QuestVotesDisplayed",
    //     }
    //     const p = new Promise(function (resolve) {
    //         setTimeout(resolve, 6000)
    //     });
    //
    //     // clock.tick(6000);
    //     console.log('test')
    //     assert.calledWith(WebsocketService.sendObj, match.any, expectedMessage)
    // })
})
