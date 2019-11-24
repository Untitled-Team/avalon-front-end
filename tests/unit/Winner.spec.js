import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Winner from "../../src/components/Winner";

let wrapper

describe('Winner.vue', () => {
    it('should display the winner correctly when good guys win', () => {
        wrapper = shallowMount(Winner, {propsData: {gameOverData: {winningTeam: "GoodGuys",goodGuys: [],badGuys: []}}})

        const goodGuysWrapper = wrapper.find('.goodGuysWin')
        const badGuysWrapper = wrapper.find('.badGuysWin')

        expect(goodGuysWrapper.isVisible()).to.be.true
        expect(badGuysWrapper.isVisible()).to.be.false
    })

    it('should display the winner correctly when bad guys win', () => {
        wrapper = shallowMount(Winner, {propsData: {gameOverData: {winningTeam: 'BadGuys', goodGuys: [], badGuys: []}}})

        const badGuysWrapper = wrapper.find('.badGuysWin')
        const goodGuysWrapper = wrapper.find('.goodGuysWin')

        expect(badGuysWrapper.isVisible()).to.be.true
        expect(goodGuysWrapper.isVisible()).to.be.false
    })

    it('should display merlin', () => {
        const expectedMerlin = 'jk rowling'
        wrapper = shallowMount(Winner, {propsData: {gameOverData: {merlin: expectedMerlin, goodGuys: [], badGuys: []}}})

        const merlinWrapper = wrapper.find('.merlin')

        expect(merlinWrapper.text()).to.contain(expectedMerlin)
    })

    it('should display the assassin', () => {
        const expectedAssassin = 'harry smooter'
        wrapper = shallowMount(Winner, {propsData: {gameOverData: {assassin: expectedAssassin, goodGuys: [], badGuys: []}}})

        const assassinWrapper = wrapper.find('.assassin')

        expect(assassinWrapper.text()).to.contain(expectedAssassin)
    })

    it('should display all the good guys except merlin in a div', () => {
        const expectedGoodGuys = ['ron', 'hermane']
        const unexpectedMerlin = 'merbling'
        wrapper = shallowMount(Winner, {propsData: {gameOverData: {merlin: unexpectedMerlin, goodGuys: [unexpectedMerlin, ...expectedGoodGuys], badGuys: []}}})

        const goodGuysWrapper = wrapper.find('.goodGuys')

        expectedGoodGuys.forEach((goodGuy) => {
            expect(goodGuysWrapper.text()).to.contain(goodGuy)
        })
        expect(goodGuysWrapper.text()).not.to.contain(unexpectedMerlin)
    })


    it('should display all the bad guys except the assassin in a div', () => {
        const expectedBadGuys = ['jeorg', 'otherbrother']
        const unexpectedAssassin = 'ASS ASS in LOL!!!!! :p'
        wrapper = shallowMount(Winner, {propsData: {gameOverData: {assassin: unexpectedAssassin, badGuys: [unexpectedAssassin, ...expectedBadGuys], goodGuys: []}}})

        const badGuysWrapper = wrapper.find('.badGuys')

        expectedBadGuys.forEach((badGuy) => {
            expect(badGuysWrapper.text()).to.contain(badGuy)
        })
        expect(badGuysWrapper.text()).not.to.contain(unexpectedAssassin)
    })
})
