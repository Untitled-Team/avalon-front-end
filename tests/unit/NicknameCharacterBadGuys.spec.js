import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import {stub} from "sinon";
import Vuex from "vuex";
import Vue from "vue";
import NicknameCharacterBadGuys from "../../src/components/NicknameCharacterBadGuys";

let wrapper
let getters
let store

Vue.use(Vuex)

describe('NicknameCharacterBadGuys.vue', () => {
    beforeEach(() => {
        getters = {
            getNickname: stub().returns('steve'),
            getCharacter: stub().returns('Merlin')
        }
        store = new Vuex.Store({
            state: {},
            getters
        })
    })

    it('should display the nickname from the store', () => {
        const expectedNickname = 'steve'
        wrapper = shallowMount(NicknameCharacterBadGuys, {store})
        wrapper.find('#toggleModal').trigger('click')

        const nicknameWrapper = wrapper.find('#nickname')

        expect(nicknameWrapper.text()).to.include(expectedNickname)
    })

    it('should display the character from the store', () => {
        const expectedCharacter = 'Merlin'
        wrapper = shallowMount(NicknameCharacterBadGuys, {store})
        wrapper.find('#toggleModal').trigger('click')


        const characterWrapper = wrapper.find('#character')

        expect(characterWrapper.text()).to.include(expectedCharacter)
    })

    it('should display the badGuys passed in as a prop', () => {
        let expectedBadGuys = ["a", "b", "c"];
        wrapper = shallowMount(NicknameCharacterBadGuys, {propsData: {badGuys: expectedBadGuys}, store})
        wrapper.find('#toggleModal').trigger('click')

        const badGuysWrapper = wrapper.find('#badGuys')

        expectedBadGuys.forEach((badGuy) => {
            expect(badGuysWrapper.text()).to.include(badGuy, `${badGuy} not in the wrapper!`)
        })
    })
})
