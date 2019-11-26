import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import {assert, stub, restore, match} from "sinon";
import PlayerInfo from "../../src/components/PlayerInfo";
import VueNativeSock from "vue-native-websocket";
import Vuex from "vuex";
import Vue from "vue";

let wrapper
let store

Vue.use(Vuex)

global.WebSocket = require('ws');

Vue.use(VueNativeSock, 'ws://localhost:8080', {});


describe('PlayerInfo.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                playerInfo: {
                    ready: false
                },
                badGuys: [],
                character: ""
            }
        })
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('should display good guy info when character is NormalGoodGuy', () => {
        store.state.character = "NormalGoodGuy"
        wrapper = shallowMount(PlayerInfo, {store})

        const infoWrapper = wrapper.findAll('.knight')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should display bad guy info when character is NormalBadGuy', () => {
        store.state.character = "NormalBadGuy"
        wrapper = shallowMount(PlayerInfo, {store})

        const infoWrapper = wrapper.findAll('.warlock')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should display merlin info when character is Merlin', () => {
        store.state.character = "Merlin"
        wrapper = shallowMount(PlayerInfo, {store})

        const infoWrapper = wrapper.findAll('.merlin')

        expect(infoWrapper.length).to.equal(1)
    })

    it('should display assassin info when character is Assassin', () => {
        store.state.character = "Assassin"
        wrapper = shallowMount(PlayerInfo, {store})


        const infoWrapper = wrapper.findAll('.assassin')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should not display other character cards when character is NormalGoodGuy', () => {
        store.state.character = "NormalGoodGuy"
        wrapper = shallowMount(PlayerInfo, {store})

        const infoWrapper = wrapper.findAll('.character')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should not display other character cards when character is NormalBadGuy', () => {
        store.state.character = "NormalBadGuy"
        wrapper = shallowMount(PlayerInfo, {store})

        const infoWrapper = wrapper.findAll('.character')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should not display other character cards when character is Merlin', () => {
        store.state.character = "Merlin"
        wrapper = shallowMount(PlayerInfo, {store})

        const infoWrapper = wrapper.findAll('.character')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should not display other character cards when character is Assassin', () => {
        store.state.character = "Assassin"
        wrapper = shallowMount(PlayerInfo, {store})

        const infoWrapper = wrapper.findAll('.character')

        expect(infoWrapper.length).to.equal(1)
    });

    it('should call sendObj correctly when submitted', () => {
        store.state.character = "NormalBadGuy"
        wrapper = shallowMount(PlayerInfo, {store})

        wrapper.find('.readyButton').trigger('click')

        assert.calledWith(WebsocketService.sendObj, match.any, {event: 'PlayerReady'})
    });
})
