import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import Intro from '@/components/Intro.vue'
import { assert, stub, match, restore} from "sinon";
import Vuex from "vuex";
import Vue from "vue";

let wrapper
let joinGameFormWrapper
let createGameFormWrapper
let mutations
let store

Vue.use(Vuex)

describe('Intro.vue', () => {
    beforeEach(() => {
        mutations = {
            setNickname: stub(),
        }
        store = new Vuex.Store({
            state: {},
            mutations
        })
        restore()
    })

    describe('join game menu', () => {
        beforeEach(() => {
            stub(WebsocketService, 'sendObj')
        })

        it('has a joinGameNickname input', () => {
            wrapper = shallowMount(Intro)
            joinGameFormWrapper = wrapper.find("#joinGameForm")

            expect(joinGameFormWrapper.contains('#joinGameNickname')).to.be.true;
        })

        it('has a joinGameRoomId input', () => {
            wrapper = shallowMount(Intro)
            joinGameFormWrapper = wrapper.find("#joinGameForm")

            expect(joinGameFormWrapper.contains('#joinGameRoomId')).to.be.true;
        })

        it('has a joinGameSubmit input', () => {
            wrapper = shallowMount(Intro)
            joinGameFormWrapper = wrapper.find("#joinGameForm")

            expect(joinGameFormWrapper.contains('#joinGameSubmit')).to.be.true;
        })

        it('calls the store setNickname method', () => {
            wrapper = shallowMount(Intro, { store })
            joinGameFormWrapper = wrapper.find("#joinGameForm")

            joinGameFormWrapper.trigger("submit.prevent")

            assert.calledOnce(mutations.setNickname)
        })

        it('calls the store setNickname method correctly', () => {
            wrapper = shallowMount(Intro, { store })
            joinGameFormWrapper = wrapper.find("#joinGameForm")
            let expectedNickname = 'nickname'
            wrapper.setData({nickname: expectedNickname})

            joinGameFormWrapper.trigger("submit.prevent")

            assert.calledWith(mutations.setNickname, {}, match(expectedNickname))
        })

        it('calls the websocketService joinGame method on submission of the joinGameForm form', () => {
            wrapper = shallowMount(Intro, { store })
            joinGameFormWrapper = wrapper.find("#joinGameForm")

            joinGameFormWrapper.trigger("submit.prevent")

            assert.calledOnce(WebsocketService.sendObj)
        })

        it('calls the websocketService joinGame method on submission of the joinGameForm form with correct data', () => {
            wrapper = shallowMount(Intro, { store })
            joinGameFormWrapper = wrapper.find("#joinGameForm")
            let expectedNickname = 'nickname'
            let expectedRoomId = "room id"
            wrapper.setData({nickname: expectedNickname})
            wrapper.setData({roomId: expectedRoomId})

            joinGameFormWrapper.trigger("submit.prevent")

            assert.calledWith(
                WebsocketService.sendObj,
                match.any,
                {
                    event: "JoinGame",
                    nickname: expectedNickname,
                    roomId: expectedRoomId
                })
        })
    })

    describe('create game menu', () => {
        beforeEach(() => {
            stub(WebsocketService, 'sendObj')
        })

        it('has a createGameNickname input', () => {
            wrapper = shallowMount(Intro)
            createGameFormWrapper = wrapper.find("#createGameForm")

            expect(wrapper.contains('#createGameNickname')).to.be.true;
        })

        it('has a createGameSubmit input', () => {
            wrapper = shallowMount(Intro)
            createGameFormWrapper = wrapper.find("#createGameForm")

            expect(wrapper.contains('#createGameSubmit')).to.be.true;
        })

        it('calls the store setNickname method', () => {
            wrapper = shallowMount(Intro, { store })
            createGameFormWrapper = wrapper.find("#createGameForm")

            createGameFormWrapper.trigger("submit.prevent")

            assert.calledOnce(mutations.setNickname)
        })

        it('calls the store setNickname method correctly', () => {
            wrapper = shallowMount(Intro, { store })
            createGameFormWrapper = wrapper.find("#createGameForm")
            let expectedNickname = 'nickname'
            wrapper.setData({nickname: expectedNickname})

            createGameFormWrapper.trigger("submit.prevent")

            assert.calledWith(mutations.setNickname, {}, match(expectedNickname))
        })

        it('calls the websocketService sendObj method on submission of the createGameForm', () => {
            wrapper = shallowMount(Intro, { store })
            createGameFormWrapper = wrapper.find("#createGameForm")

            createGameFormWrapper.trigger("submit.prevent")

            assert.calledOnce(WebsocketService.sendObj)
        })

        it('calls the websocketService joinGame method on submission of the joinGameForm form with correct data', () => {
            wrapper = shallowMount(Intro, { store })
            createGameFormWrapper = wrapper.find("#createGameForm")

            let expectedNickname = 'nickname'
            wrapper.setData({nickname: expectedNickname})

            createGameFormWrapper.trigger("submit.prevent")

            assert.calledWith(
                WebsocketService.sendObj,
                match.any,
                {
                    event: "CreateGame",
                    nickname: expectedNickname,
                })
        })
    })
})
