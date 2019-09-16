import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Intro from '@/components/Intro.vue'
import WebsocketService from "@/services/WebsocketService";
let sinon = require('sinon');

let wrapper
let joinGameFormWrapper
let createGameFormWrapper

let websocketService = new WebsocketService
let mockWebsocketService

beforeEach(() => {
    wrapper = shallowMount(Intro)
    mockWebsocketService = sinon.mock(websocketService)
    sinon.restore()
})

describe('Intro.vue', () => {
    it('has a welcome to avalon message', () => {
        let expectedHeader = "Welcome to Avalon!"

        expect(wrapper.text()).to.include(expectedHeader)
    })

    describe('join game menu', () => {
        beforeEach(() => {
            joinGameFormWrapper = wrapper.find("#joinGameForm")
        })

        it('has a joinGameNickname input', () => {
            expect(joinGameFormWrapper.contains('#joinGameNickname')).to.be.true;
        })

        it('has a joinGameRoomId input', () => {
            expect(joinGameFormWrapper.contains('#joinGameRoomId')).to.be.true;
        })

        it('has a joinGameSubmit input', () => {
            expect(joinGameFormWrapper.contains('#joinGameSubmit')).to.be.true;
        })

        it('calls the websocketService joinGame method on submission of the joinGameForm form', () => {
            joinGameFormWrapper.trigger("submit.prevent")

            sinon.assert.calledOnce(mockWebsocketService.joinGame)
        })
    })

    describe('create game menu', () => {
        beforeEach(() => {
            createGameFormWrapper = wrapper.find("#createGameForm")
        })

        it('has a createGameNickname input', () => {
            expect(wrapper.contains('#createGameNickname')).to.be.true;
        })

        it('has a createGameSubmit input', () => {
            expect(wrapper.contains('#createGameSubmit')).to.be.true;
        })

        it('calls the createGame method on submission of the createGameForm form', () => {
            let spy = sinon.spy(wrapper.vm, "createGame")

            createGameFormWrapper.trigger("submit.prevent")

            expect(spy.called).to.be.true
        })
    })
})
