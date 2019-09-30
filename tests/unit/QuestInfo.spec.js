import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import QuestInfo from "../../src/components/QuestInfo";
import {stub, restore} from "sinon";
import Vuex from "vuex";
import Vue from "vue";

let wrapper
let getters
let store

Vue.use(Vuex)

describe('QuestInfo.vue', () => {
    beforeEach(() => {
        getters = {
            getNickname: stub().returns('steve'),
            getCharacter: stub().returns('Merlin')
        }
        store = new Vuex.Store({
            state: {},
            getters
        })
        restore()
    })

    // it('should display the nickname', () => {
    //     const expectedNickname = 'steve'
    //     wrapper = shallowMount(QuestInfo, {store})
    //
    //     const nicknameWrapper = wrapper.find('#nickname')
    //
    //     expect(nicknameWrapper.text()).to.equal(expectedNickname)
    // })
    //
    // it('should display the character', () => {
    //     const expectedCharacter = 'Merlin'
    //     wrapper = shallowMount(QuestInfo, {store})
    //
    //     const nicknameWrapper = wrapper.find('#character')
    //
    //     expect(nicknameWrapper.text()).to.equal(expectedCharacter)
    // })

    it('should display 5 quests', () => {
        wrapper = shallowMount(
            QuestInfo,
            {
                store,
                propsData: {
                    quests: [{}, {}, {}, {}, {}]
                }
            })

        const questsWrapper = wrapper.findAll('.quest')

        expect(questsWrapper.length).to.equal(5)
    })
})
