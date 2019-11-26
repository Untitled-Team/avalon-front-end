import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import QuestInfo from "../../src/components/QuestInfo";
import Vuex from "vuex";
import Vue from "vue";

let wrapper
let store

Vue.use(Vuex)


describe('QuestInfo.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({state: {missions: [{}, {}, {}, {}, {}]}})
    })

    it('should display 5 quests', () => {
        wrapper = shallowMount(QuestInfo, {store})

        const questsWrapper = wrapper.findAll('.quest')

        expect(questsWrapper.length).to.equal(5)
    })
})
