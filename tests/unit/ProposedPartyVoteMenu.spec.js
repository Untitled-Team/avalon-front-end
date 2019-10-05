import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import {assert, match, restore, stub} from "sinon";
import ProposedPartyVoteMenu from "../../src/components/ProposedPartyVoteMenu";

let wrapper

describe('ProposedPartyVoteMenu.vue', () => {
    beforeEach(() => {
        restore()
        stub(WebsocketService, 'sendObj')
    })

    it('should display the vote menu before the player has voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu)

        let voteWrapper = wrapper.find('#vote')

        expect(voteWrapper.isVisible()).to.be.true
    })

    it('should not display the vote menu after the player has voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu)

        let voteWrapper = wrapper.find('#vote')
        wrapper.setData({playerHasVoted: true})

        expect(voteWrapper.isVisible()).to.be.false
    })

    it('should not display the WaitingOnOthers div before the player has voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu)

        let waitingOnOthersWrapper = wrapper.find('#WaitingOnOthers')

        expect(waitingOnOthersWrapper.isVisible()).to.be.false
    })

    it('should display the WaitingOnOthers div after the player has voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu)

        let waitingOnOthersWrapper = wrapper.find('#WaitingOnOthers')
        wrapper.setData({playerHasVoted: true})

        expect(waitingOnOthersWrapper.isVisible()).to.be.true
    })

    it('should set playerHasVoted to true after player has approve voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu)

        wrapper.find('#approveButton').trigger('click')

        expect(wrapper.vm.$data.playerHasVoted).to.be.true
    })


    it('should call send obj correctly after player has approve voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu)
        const expectedMessage = {
            event: 'PartyApprovalVote',
            partyPassVote: true,
        }

        wrapper.find('#approveButton').trigger('click')

        assert.calledWith(WebsocketService.sendObj, match.any, expectedMessage)
    })

    it('should set playerHasVoted to true after player has deny voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu)

        wrapper.find('#denyButton').trigger('click')

        expect(wrapper.vm.$data.playerHasVoted).to.be.true
    })

    it('should call send obj correctly after player has approve voted', () => {
        wrapper = shallowMount(ProposedPartyVoteMenu)
        const expectedMessage = {
            event: 'PartyApprovalVote',
            partyPassVote: false,
        }

        wrapper.find('#denyButton').trigger('click')

        assert.calledWith(WebsocketService.sendObj, match.any, expectedMessage)
    })
})