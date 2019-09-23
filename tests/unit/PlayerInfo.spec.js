import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import { assert, stub, restore} from "sinon";
import Vuex from "vuex";
import Vue from "vue";
import PlayerInfo from "../../src/components/PlayerInfo";

let wrapper

Vue.use(Vuex)

describe('PlayerInfo.vue', () => {
    beforeEach(() => {
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('should display good guy info when character is NormalGoodGuy', () => {
        wrapper = shallowMount(
            PlayerInfo,
            {
                propsData: {
                    character: 'NormalGoodGuy'
                }
            })

        const infoWrapper = wrapper.find('.info')

        expect(infoWrapper.text()).to.contain('You\'re a regular good guy!')
    });

    it('should display bad guy info when character is NormalBadGuy', () => {
        wrapper = shallowMount(
            PlayerInfo,
            {
                propsData: {
                    character: 'NormalBadGuy'
                }
            })

        const infoWrapper = wrapper.find('.info')

        expect(infoWrapper.text()).to.contain('You\'re a regular bad guy!')
    });

    it('should display merlin info when character is Merlin', () => {
        wrapper = shallowMount(
            PlayerInfo,
            {
                propsData: {
                    character: 'Merlin'
                }
            })

        const infoWrapper = wrapper.find('.info')

        expect(infoWrapper.text()).to.contain('You\'re Merlin!')
    })

    it('should display assassin info when character is Assassin', () => {
        wrapper = shallowMount(
            PlayerInfo,
            {
                propsData: {
                    character: 'Assassin'
                }
            })

        const infoWrapper = wrapper.find('.info')

        expect(infoWrapper.text()).to.contain('You\'re the assassin')
    });

    it('should not display other character cards when character is NormalGoodGuy', () => {
        wrapper = shallowMount(
            PlayerInfo,
            {
                propsData: {
                    character: 'NormalGoodGuy'
                }
            })

        const infoWrapper = wrapper.findAll('.info')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should not display other character cards when character is NormalBadGuy', () => {
        wrapper = shallowMount(
            PlayerInfo,
            {
                propsData: {
                    character: 'NormalBadGuy'
                }
            })

        const infoWrapper = wrapper.findAll('.info')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should not display other character cards when character is Merlin', () => {
        wrapper = shallowMount(
            PlayerInfo,
            {
                propsData: {
                    character: 'Merlin'
                }
            })

        const infoWrapper = wrapper.findAll('.info')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should not display other character cards when character is Assassin', () => {
        wrapper = shallowMount(
            PlayerInfo,
            {
                propsData: {
                    character: 'Assassin'
                }
            })

        const infoWrapper = wrapper.findAll('.info')

        expect(infoWrapper.length).to.equal(1)
    });

    it('button does not display after player clicks it', () => {
        wrapper = shallowMount(PlayerInfo)

        const buttonWrapper = wrapper.find('button')
        expect(buttonWrapper.isVisible()).to.be.true
        buttonWrapper.trigger('click')

        expect(buttonWrapper.isVisible()).to.be.false
    });

    it('ready div does not display before player clicks button', () => {
        wrapper = shallowMount(PlayerInfo)

        const readyWrapper = wrapper.find('.ready')
        expect(readyWrapper.isVisible()).to.be.false
        wrapper.find('button').trigger('click')

        expect(readyWrapper.isVisible()).to.be.true
    });

    it('should call sendObj correctly when submitted', () => {
        wrapper = shallowMount(PlayerInfo)

        wrapper.find('button').trigger('click')

        assert.calledWith(WebsocketService.sendObj, {event: 'PlayerReady'})
    });
})
