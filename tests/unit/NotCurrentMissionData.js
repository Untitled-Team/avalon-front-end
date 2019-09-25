import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Vuex from "vuex";
import Vue from "vue";
import NotCurrentMissionData from "../../src/components/NotCurrentMissionData";

let wrapper
Vue.use(Vuex)

describe('NotCurrentMissionData.vue', () => {
    it('should display a message if there is no quest data available (future quest)', () => {
        wrapper = shallowMount(
            NotCurrentMissionData,
            {
                propsData: {
                    activeQuestData: {
                        pass: null
                    }
                }
            })

        const noDataWrapper = wrapper.find('#NoQuestData')

        expect(noDataWrapper.exists()).to.be.true
    })

    it('should not display a no data message if there is quest data available (future quest)', () => {
        wrapper = shallowMount(
            NotCurrentMissionData,
            {
                propsData: {
                    activeQuestData: {
                        pass: true
                    }
                }
            })

        const noDataWrapper = wrapper.find('#NoQuestData')

        expect(noDataWrapper.exists()).to.be.false
    })

    it('should not display mission history if there is no quest data available (future quest)', () => {
        wrapper = shallowMount(
            NotCurrentMissionData,
            {
                propsData: {
                    activeQuestData: {
                        pass: null
                    }
                }
            })

        const noDataWrapper = wrapper.find('#missionHistory')

        expect(noDataWrapper.exists()).to.be.false
    })

    it('should display mission history if there is quest data available (future quest)', () => {
        wrapper = shallowMount(
            NotCurrentMissionData,
            {
                propsData: {
                    activeQuestData: {
                        pass: true
                    }
                }
            })

        const noDataWrapper = wrapper.find('#missionHistory')

        expect(noDataWrapper.exists()).to.be.true
    })

    describe('mission history data', () => {
        it('should display number of adventurers', () => {
            const expectedNumberOfAdventurers = 45324
            wrapper = shallowMount(
                NotCurrentMissionData,
                {
                    propsData: {
                        activeQuestData: {
                            pass: true,
                            numberOfAdventurers: expectedNumberOfAdventurers
                        }
                    }
                })

            const numAdventurersWrapper = wrapper.find('#numberOfAdventurers');

            expect(numAdventurersWrapper.text()).to.include(expectedNumberOfAdventurers)
        })

        it('should display each player', () => {
            const expectedPlayers = ['john', 'barb', 'karen']
            wrapper = shallowMount(
                NotCurrentMissionData,
                {
                    propsData: {
                        activeQuestData: {
                            pass: true,
                            players: expectedPlayers
                        }
                    }
                })

            expectedPlayers.forEach((expectedPlayer) => {
                expect(wrapper.text()).to.include(expectedPlayer, `${expectedPlayer} not in the form!`)
            })
        })

        it('should display correct message on mission success', () => {
            wrapper = shallowMount(
                NotCurrentMissionData,
                {
                    propsData: {
                        activeQuestData: {
                            pass: true,
                        }
                    }
                })

            const sucessWrapper = wrapper.find('#success')

            expect(sucessWrapper.exists()).to.be.true
            expect(wrapper.find('#failure').exists()).to.be.false
        })

        it('should display correct message on mission failure', () => {
            wrapper = shallowMount(
                NotCurrentMissionData,
                {
                    propsData: {
                        activeQuestData: {
                            pass: false,
                        }
                    }
                })

            const failureWrapper = wrapper.find('#failure')

            expect(failureWrapper.exists()).to.be.true
            expect(wrapper.find('#success').exists()).to.be.false
        })

        it('should display a party vote div for each party vote in the data', () => {
            console.log('first')

            wrapper = shallowMount(
                NotCurrentMissionData,
                {
                    propsData: {
                        activeQuestData: {
                            pass: false,
                            votes: [
                                {successVotes: 1, failVotes: 1},
                                {successVotes: 1, failVotes: 1},
                                {successVotes: 1, failVotes: 1},
                                {successVotes: 1, failVotes: 1},
                            ]
                        }
                    }
                })
            console.log('second')


            const partyVoteWrapper = wrapper.findAll('.partyVote')

            console.log('third')

            expect(partyVoteWrapper.length).to.equal(4)
        })
    })
})
