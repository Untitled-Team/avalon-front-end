import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Vuex from "vuex"
import Vue from "vue"
import Quest from "../../src/components/Quest"

let wrapper
let store

Vue.use(Vuex)

describe('Quest.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: {activeMission: 1},
        })
    })

    it('should have the correct class if mission passes', () => {
        const expectedClass = "passing"
        const unexpectedClasses = ["notCompleted", "failing"]
        wrapper = shallowMount(Quest, {store, propsData: {quest: {pass: true}, quests: [{pass: 'doesn\'t matter'}]}})

        const questWrapper = wrapper.find('.questWrapper')

        // console.log(wrapper.vm.$props.quests)

        expect(questWrapper.classes()).to.contain(expectedClass)
        unexpectedClasses.forEach((unexpectedClass) => {
            expect(wrapper.classes()).not.to.contain(unexpectedClass, `${unexpectedClass} should not be a class on the quest!`)
        })
    })

    it('should have the correct class if mission fails', () => {
        const expectedClass = "failing"
        const unexpectedClasses = ["passing", "notCompleted"]
        wrapper = shallowMount(Quest, {store, propsData: {quest: {pass: false}, quests: [{pass: 'doesn\'t matter'}]}})

        const questWrapper = wrapper.find('.questWrapper')

        expect(questWrapper.classes()).to.contain(expectedClass)
        unexpectedClasses.forEach((unexpectedClass) => {
            expect(wrapper.classes()).not.to.contain(unexpectedClass, `${unexpectedClass} should not be a class on the quest!`)
        })
    })

    it('should have the correct class if mission hasn\'t happened', () => {
        const expectedClass = "notCompleted"
        const unexpectedClasses = ["passing", "failing"]
        wrapper = shallowMount(Quest, {store, propsData: {quest: {pass: null}, quests: [{pass: 'doesn\'t matter'}]}})

        const questWrapper = wrapper.find('.questWrapper')

        expect(questWrapper.classes()).to.contain(expectedClass)
        unexpectedClasses.forEach((unexpectedClass) => {
            expect(wrapper.classes()).not.to.contain(unexpectedClass, `${unexpectedClass} should not be a class on the quest!`)
        })
    })

    it('should display the number of adventurers', () => {
        const expectedNumberOfAdventurers = 32432
        wrapper = shallowMount(Quest, {
            store,
            propsData: {quest: {pass: null, numberOfAdventurers: expectedNumberOfAdventurers}, quests: [{pass: 'doesn\'t matter'}]}
        })

        const partySizeWrapper = wrapper.find('.partySize')

        expect(partySizeWrapper.text()).to.contain(expectedNumberOfAdventurers)
    })
})
