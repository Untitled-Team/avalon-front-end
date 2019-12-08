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
                players: [],
                nickname: 'steve',
                currentMissionLeader: "",
                missions: [{numberOfAdventurers: 0}],
                currentMission: 1,
                ProposeMissionMenu: {
                    proposalsLeft: 10
                }
            },
        })
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('should show the current mission leader is choosing a party when we\'re not leader', () => {
        const expectedMissionLeader = "glorbon"
        store.state.currentMissionLeader = expectedMissionLeader
        wrapper = shallowMount(ProposeMissionMenu, {store})

        const leaderWrapper = wrapper.find('.choosing')

        expect(leaderWrapper.text()).to.include(expectedMissionLeader)
    })

    it('should have a form that shows a label for each player when player is mission leader', () => {
        const expectedPlayers = ["john", "steve", "sally sue peterson"]
        const expectedMissionLeader = "steve"
        store.state.currentMissionLeader = expectedMissionLeader
        store.state.players = expectedPlayers
        wrapper = shallowMount(ProposeMissionMenu, {store})


        const formWrapper = wrapper.find('form')

        expectedPlayers.forEach((expectedPlayer) => {
            expect(formWrapper.text()).to.include(expectedPlayer, `${expectedPlayer} not in the form!`)
        })
    })

    it('should call sendObj correctly when player votes pass.', () => {
        const expectedPlayers = ["john", "steve", "sally sue peterson"]
        store.state.missions = [{numberOfAdventurers: 3}]
        wrapper = shallowMount(
            ProposeMissionMenu,
            {
                data: function () {
                    return {
                        selectedPlayers: expectedPlayers
                    }
                },
                store
            })
        const expectedMessage = {
            event: 'ProposeParty',
            proposedParty: expectedPlayers,
        }

        wrapper.find('form').trigger('submit.prevent')

        assert.calledWith(
            WebsocketService.sendObj,
            match.any,
            expectedMessage)
    })
})
