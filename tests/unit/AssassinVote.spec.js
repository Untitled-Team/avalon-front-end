import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import {assert, match, restore, stub} from "sinon";
import Vuex from "vuex";
import Vue from "vue";
import AssassinVote from "../../src/components/AssassinVote";

let wrapper
let getters
let store

Vue.use(Vuex)

describe('AssassinVote.vue', () => {
    beforeEach(() => {
        getters = {
            getNickname: stub().returns('me')
        }
        store = new Vuex.Store({
            state: {
                missions: [{pass: null}],
                currentMission: 1,
                assassinVote: {
                    assassinVoteData: {
                        assassin: 'me',
                    }
                }
            },
            getters
        })
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('displays the assassin', () => {
        let expectedAssassin = 'me';
        wrapper = shallowMount(AssassinVote, {store})

        const assassinWrapper = wrapper.find('#assassin')

        expect(assassinWrapper.text()).to.include(expectedAssassin)
    })

    it('should sendObj correctly on form submit', () => {
        let expectedGuess = 'Norman Jones Sr.';
        let expectedMessage = {
            event: 'AssassinVote',
            guess: expectedGuess
        }
        wrapper = shallowMount(
            AssassinVote,
            {
                data: function () {
                    return {
                        guess: expectedGuess
                    }
                },
                store
            })

        wrapper.find('.assassinateButtonImage').trigger('click')

        assert.calledWith(WebsocketService.sendObj, match.any, expectedMessage)
    })

    it('should display each player', () => {
        let expectedGoodGuys = ['kate', 'anne', 'bobby']
        store.state.assassinVote.assassinVoteData.goodGuys = expectedGoodGuys
        wrapper = shallowMount(AssassinVote, {store})

        const assassinationWrapper = wrapper.find('.assassination')

        expectedGoodGuys.forEach((goodGuy) => {
            expect(assassinationWrapper.text()).to.include(goodGuy, `${goodGuy} not in the form!`)
        })
    })

    it('should set the guess to the selected player', () => {
        let expectedMerlin1 = 'kate';
        let expectedMerlin2 = 'anne';
        store.state.assassinVote.assassinVoteData.goodGuys = [expectedMerlin1, expectedMerlin2]
        wrapper = shallowMount(AssassinVote, {store})

        const goodGuyInputs = wrapper.findAll('input[type=radio]')

        goodGuyInputs.at(0).trigger('click')
        expect(wrapper.vm.$data.guess).to.equal(expectedMerlin1)

        goodGuyInputs.at(1).trigger('click')
        expect(wrapper.vm.$data.guess).to.equal(expectedMerlin2)
    })
})
