import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Vuex from "vuex";
import Vue from "vue";
import Quest from "../../src/components/Quest";

let wrapper
let store

Vue.use(Vuex)

describe('Quest.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: {},
        })
    })

    it('should display the nickname', () => {
        const expectedNickname = 'steve'
        wrapper = shallowMount(Quest, {store})

        const nicknameWrapper = wrapper.find('#nickname')

        expect(nicknameWrapper.text()).to.equal(expectedNickname)
    })
})
