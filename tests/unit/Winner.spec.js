import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Winner from "../../src/components/Winner";
import Vuex from "vuex";
import Vue from "vue";
import {restore} from "sinon"

let wrapper
let store

Vue.use(Vuex)

describe('Winner.vue', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                Winner: {
                    gameOverData: {
                        winningTeam: "",
                        goodGuys: [],
                        badGuys: [],
                        merlin: "",
                        assassin: "",
                    }
                }
            }
        })
        restore()
    })

    it('should display the winner correctly when good guys win', () => {
        store.state.Winner.gameOverData.winningTeam = "GoodGuys"
        wrapper = shallowMount(Winner, {store})

        const goodGuysWrapper = wrapper.find('.goodGuysWin')
        const badGuysWrapper = wrapper.find('.badGuysWin')

        expect(goodGuysWrapper.isVisible()).to.be.true
        expect(badGuysWrapper.isVisible()).to.be.false
    })

    it('should display the winner correctly when bad guys win', () => {
        store.state.Winner.gameOverData.winningTeam = "BadGuys"
        wrapper = shallowMount(Winner, {store})

        const badGuysWrapper = wrapper.find('.badGuysWin')
        const goodGuysWrapper = wrapper.find('.goodGuysWin')

        expect(badGuysWrapper.isVisible()).to.be.true
        expect(goodGuysWrapper.isVisible()).to.be.false
    })

    it('should display merlin', () => {
        const expectedMerlin = 'jk rowling'
        store.state.Winner.gameOverData.merlin = expectedMerlin
        wrapper = shallowMount(Winner, {store})

        const merlinWrapper = wrapper.find('.merlin')

        expect(merlinWrapper.text()).to.contain(expectedMerlin)
    })

    it('should display the assassin', () => {
        const expectedAssassin = 'harry smooter'
        store.state.Winner.gameOverData.assassin = expectedAssassin
        wrapper = shallowMount(Winner, {store})

        const assassinWrapper = wrapper.find('.assassin')

        expect(assassinWrapper.text()).to.contain(expectedAssassin)
    })

    it('should display all the good guys except merlin in a div', () => {
        const expectedGoodGuys = ['ron', 'hermane']
        const unexpectedMerlin = 'merbling'
        store.state.Winner.gameOverData.goodGuys = expectedGoodGuys
        store.state.Winner.gameOverData.merlin = unexpectedMerlin
        wrapper = shallowMount(Winner, {store})

        const goodGuysWrapper = wrapper.find('.goodGuys')

        expectedGoodGuys.forEach((goodGuy) => {
            expect(goodGuysWrapper.text()).to.contain(goodGuy)
        })
        expect(goodGuysWrapper.text()).not.to.contain(unexpectedMerlin)
    })


    it('should display all the bad guys except the assassin in a div', () => {
        const expectedBadGuys = ['jeorg', 'otherbrother']
        const unexpectedAssassin = 'ASS ASS in LOL!!!!! :p'
        store.state.Winner.gameOverData.badGuys = expectedBadGuys
        store.state.Winner.gameOverData.assassin = unexpectedAssassin
        wrapper = shallowMount(Winner, {store})

        const badGuysWrapper = wrapper.find('.badGuys')

        expectedBadGuys.forEach((badGuy) => {
            expect(badGuysWrapper.text()).to.contain(badGuy)
        })
        expect(badGuysWrapper.text()).not.to.contain(unexpectedAssassin)
    })
})
