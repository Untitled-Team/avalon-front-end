import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import {assert, stub, match, restore} from "sinon";
import Vuex from "vuex";
import Vue from "vue";
import PassFailVote from "../../src/components/PassFailVote";

let wrapper
let getters
let store

Vue.use(Vuex)

describe('PassFailVote.vue', () => {
    beforeEach(() => {
        getters = {
            getNickname: stub().returns('steve')
        }
        store = new Vuex.Store({
            state: {},
            getters
        })
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('displays each party member', () => {
        let expectedParty = ['john', 'johan', 'johnny', 'sue'];
        wrapper = shallowMount(
            PassFailVote,
            {
                propsData: {
                    missionParty: expectedParty
                },
            store
            })

        expectedParty.forEach((player) => {
            expect(wrapper.text()).to.include(player, `${player} not in the wrapper!`)
        })
    })

    // it('should display a passButton until player votes', () => {
    //     wrapper = shallowMount(
    //         PassFailVote,
    //         {
    //             store,
    //             propsData: {
    //                 missionParty: ['steve']
    //             },
    //         })
    //
    //     let passButtonWrapper = wrapper.find('#passButton')
    //     expect(passButtonWrapper.isVisible()).to.be.true
    //     passButtonWrapper.trigger('click')
    //
    //     expect(passButtonWrapper.isVisible()).to.be.false
    // })

    // it('should display a failButton until player votes', () => {
    //     wrapper = shallowMount(
    //         PassFailVote,
    //         {
    //             store,
    //             propsData: {
    //                 missionParty: ['steve']
    //             },
    //         })
    //
    //     let failButtonWrapper = wrapper.find('#failButton')
    //     expect(failButtonWrapper.isVisible()).to.be.true
    //     failButtonWrapper.trigger('click')
    //
    //     expect(failButtonWrapper.isVisible()).to.be.false
    // })

    it('should call sendObj correctly when player votes pass.', () => {
        wrapper = shallowMount(
            PassFailVote,
            {
                store,
                propsData: {
                    missionParty: ['steve']
                },
            })
        let expectedMessage = {
            event: 'QuestVote',
            questPassVote: true,
        }

        wrapper.find('#passButton').trigger('click')

        assert.calledWith(
            WebsocketService.sendObj,
            match.any,
            expectedMessage)
    })

    it('should call sendObj correctly when player votes fail.', () => {
        wrapper = shallowMount(
                PassFailVote,
                {
                    store,
                    propsData: {
                        missionParty: ['steve']
                    },
                })
            let expectedMessage = {
                event: 'QuestVote',
                questPassVote: false,
            }

            wrapper.find('#failButton').trigger('click')

            assert.calledWith(
                WebsocketService.sendObj,
                match.any,
                expectedMessage)
    })

    it('should not display the ready message before player has voted if they\'re in the party.', () => {
        wrapper = shallowMount(
            PassFailVote,
            {
                store,
                propsData: {
                    missionParty: ['steve']
                },
            })

        const waitingWrapper = wrapper.find('#WaitingOnOthers')

        expect(waitingWrapper.isVisible()).to.be.false
    })

    // it('should not display the ready message before player has voted.', () => {
    //     wrapper = shallowMount(
    //         PassFailVote,
    //         {
    //             store,
    //             propsData: {
    //                 missionParty: ['steve']
    //             },
    //         })
    //
    //     const waitingWrapper = wrapper.find('#WaitingOnOthers')
    //     wrapper.find('#passButton').trigger('click')
    //
    //     expect(waitingWrapper.isVisible()).to.be.true
    // })

    it('should display the ready message before player has voted if they\'re not in the party', () => {
        wrapper = shallowMount(
            PassFailVote,
            {
                store,
                propsData: {
                    missionParty: ['john']
                },
            })

        const waitingWrapper = wrapper.find('#WaitingOnOthers')

        expect(waitingWrapper.isVisible()).to.be.true
    })
})
