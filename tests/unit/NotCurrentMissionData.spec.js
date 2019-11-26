import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Vuex from "vuex";
import Vue from "vue";
import NotCurrentMissionData from "../../src/components/NotCurrentMissionData";
import {restore} from "sinon"

let wrapper
let store

Vue.use(Vuex)

describe('NotCurrentMissionData.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                currentMissionLeader: "",
                missions: [],
                activeMission: 0,
                players: []
            }
        })
        restore()
    })

    it('should display a message if there is no quest data available (future quest)', () => {
        store.state.missions = [{pass: null}]
        store.state.activeMission = 1
        wrapper = shallowMount(NotCurrentMissionData, {store})

        const noDataWrapper = wrapper.find('#NoQuestData')

        expect(noDataWrapper.exists()).to.be.true
    })

    it('should not display a no data message if there is quest data available (future quest)', () => {
        store.state.missions = [{pass: true, votes: [{missionLeader: ""}]}]
        store.state.activeMission = 1
        wrapper = shallowMount(NotCurrentMissionData, {store})

        const noDataWrapper = wrapper.find('#NoQuestData')

        expect(noDataWrapper.exists()).to.be.false
    })

    it('should not display mission history if there is no quest data available (future quest)', () => {
        store.state.missions = [{pass: null}]
        store.state.activeMission = 1
        wrapper = shallowMount(NotCurrentMissionData, {store})

        const noDataWrapper = wrapper.find('#missionHistory')

        expect(noDataWrapper.exists()).to.be.false
    })

    it('should display mission history if there is quest data available (future quest)', () => {
        store.state.missions = [{pass: true, votes: [{missionLeader: ""}]}]
        store.state.activeMission = 1
        wrapper = shallowMount(NotCurrentMissionData, {store})

        const noDataWrapper = wrapper.find('.missionHistory')

        expect(noDataWrapper.exists()).to.be.true
    })

    describe('mission history data', () => {
        it('should display each player', () => {
            const expectedPlayers = ['john', 'barb', 'karen']
            store.state.missions = [{pass: true, players: expectedPlayers, votes: [{missionLeader: ""}]}]
            store.state.activeMission = 1
            wrapper = shallowMount(NotCurrentMissionData, {store})

            expectedPlayers.forEach((expectedPlayer) => {
                expect(wrapper.text()).to.include(expectedPlayer, `${expectedPlayer} not in the form!`)
            })
        })

        it('should display correct message on mission success', () => {
            store.state.missions = [{pass: true, votes: [{missionLeader: ""}]}]
            store.state.activeMission = 1
            wrapper = shallowMount(NotCurrentMissionData, {store})

            const sucessWrapper = wrapper.find('.success')

            expect(sucessWrapper.exists()).to.be.true
            expect(wrapper.find('.failure').exists()).to.be.false
        })

        it('should display correct message on mission failure', () => {
            store.state.missions = [{pass: false, votes: [{missionLeader: ""}]}]
            store.state.activeMission = 1
            wrapper = shallowMount(NotCurrentMissionData, {store})

            const failureWrapper = wrapper.find('.failure')

            expect(failureWrapper.exists()).to.be.true
            expect(wrapper.find('.success').exists()).to.be.false
        })
    })
})
