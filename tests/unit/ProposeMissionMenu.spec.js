import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import {assert, stub, restore, match} from "sinon";
import Vuex from "vuex";
import Vue from "vue";
import ProposeMissionMenu from "../../src/components/ProposeMissionMenu";
import WebsocketService from "../../src/services/WebsocketService";

let wrapper
let store

Vue.use(Vuex)

describe('ProposeMissionMenu.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                nickname: 'steve'
            },
        })
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('should show the current mission leader', () => {
        const expectedMissionLeader = "glorbon"
        wrapper = shallowMount(
            ProposeMissionMenu,
            {
                propsData: {
                    missionLeader: expectedMissionLeader
                },
                store
            })

        const leaderWrapper = wrapper.find('#missionLeader')

        expect(leaderWrapper.text()).to.include(expectedMissionLeader)
    })

    it('should show the current mission party size', () => {
        const expectedPartysize = 48294
        wrapper = shallowMount(
            ProposeMissionMenu,
            {
                propsData: {
                    currentMissionPartySize: expectedPartysize
                },
                store
            })

        const leaderWrapper = wrapper.find('#partySize')

        expect(leaderWrapper.text()).to.include(expectedPartysize)
    })

    it('should have a form that shows a checkbox for each player', () => {
        const expectedPlayers = ["john", "steve", "sally sue peterson"]
        wrapper = shallowMount(
            ProposeMissionMenu,
            {
                data: function () {
                    return {
                        players: expectedPlayers
                    }
                },
                store
            })

        const formWrapper = wrapper.find('form')

        expectedPlayers.forEach((expectedPlayer) => {
            expect(formWrapper.text()).to.include(expectedPlayer, `${expectedPlayer} not in the form!`)
        })
    })

    it('should call sendObj correctly when player votes pass.', () => {
        const expectedPlayers = ["john", "steve", "sally sue peterson"]
        wrapper = shallowMount(
            ProposeMissionMenu,
            {
                data: function () {
                    return {
                        selectedPlayers: expectedPlayers
                    }
                },
                propsData: {
                    currentMissionPartySize: 3
                },
                store
            })
        let expectedMessage = {
            event: 'ProposeParty',
            proposedParty: expectedPlayers,
        }

        wrapper.find('form').trigger('submit.prevent')

        assert.calledWith(
            WebsocketService.sendObj,
            match.any,
            expectedMessage)
    })

    it('should display warning if player is missionLeader and incorrect party size', () => {
        wrapper = shallowMount(
            ProposeMissionMenu,
            {
                data: function () {
                    return {
                        selectedPlayers: ["", "", ""]
                    }
                },
                propsData: {
                    missionLeader: 'steve',
                    currentMissionPartySize: 2
                },
                store
            })

        const partySizeWrapper = wrapper.find('#partySizeWarning')
        expect(partySizeWrapper.isVisible()).to.be.true

        wrapper.setData({selectedPlayers: ["", ""]})
        expect(partySizeWrapper.isVisible()).to.be.false
    })
})
