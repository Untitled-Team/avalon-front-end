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
            state: {},
            getters
        })
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('displays the assassin', () => {
        let expectedAssassin = 'me';
        wrapper = shallowMount(
            AssassinVote,
            {
                propsData: {
                    assassinVoteData: {
                        assassin: expectedAssassin
                    }
                },
                store
            })

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
                propsData: {
                    assassinVoteData: {
                        assassin: 'me'
                    }
                },
                data: function () {
                    return {
                        guess: expectedGuess

                    }
                },
                store
            })

        wrapper.find('#assassinVoteForm').trigger('submit.prevent')

        assert.calledWith(WebsocketService.sendObj, match.any, expectedMessage)
    })

    it('should display each player', () => {
        let expectedGoodGuys = ['kate', 'anne', 'bobby']
        wrapper = shallowMount(
            AssassinVote,
            {
                propsData: {
                    assassinVoteData: {
                        assassin: 'me',
                        goodGuys: expectedGoodGuys
                    }
                },
                store
            })

        const assassinFormWrapper = wrapper.find('#assassinVoteForm')

        expectedGoodGuys.forEach((goodGuy) => {
            expect(assassinFormWrapper.text()).to.include(goodGuy, `${goodGuy} not in the form!`)
        })
    })

    it('should set the guess to the selected player', () => {
        let expectedMerlin1 = 'kate';
        let expectedMerlin2 = 'anne';
        wrapper = shallowMount(
            AssassinVote,
            {
                propsData: {
                    assassinVoteData: {
                        assassin: 'me',
                        goodGuys: [expectedMerlin1, expectedMerlin2]
                    }
                },
                store
            })

        const goodGuyInputs = wrapper.findAll('input[type=radio]')

        goodGuyInputs.at(0).trigger('click')
        expect(wrapper.vm.$data.guess).to.equal(expectedMerlin1)

        goodGuyInputs.at(1).trigger('click')
        expect(wrapper.vm.$data.guess).to.equal(expectedMerlin2)
    })
})
