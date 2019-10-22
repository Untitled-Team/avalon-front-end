import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import WebsocketService from '../../src/services/WebsocketService.js'
import Lobby from "../../src/components/Lobby";
import {assert, restore, stub} from "sinon";

let wrapper

describe('Lobby.vue', () => {
    beforeEach(() => {
        restore()
    })

    it('displays the lobby ID', () => {
        let expectedRoomId = "690 blaze it";
        wrapper = shallowMount(
            Lobby,
            {
                propsData:
                    {
                        roomId: expectedRoomId,
                        players: []
                    }
            },
        )
        let totalPlayersWrapper = wrapper.find('.roomId')

        expect(totalPlayersWrapper.text()).to.contain(`${expectedRoomId}`)
    })

    // No longer displaying the # of players in the room - might change so leaving this here
    // it('displays the number of players in the lobby', () => {
    //     let expectedPlayers = ["", ""];
    //     wrapper = shallowMount(
    //         Lobby,
    //         {
    //             propsData:
    //                 {
    //                     players: expectedPlayers
    //                 }
    //         },
    //     )
    //     let totalPlayersWrapper = wrapper.find('#totalPlayers')
    //
    //     expect(totalPlayersWrapper.text()).to.equal(`Total Players: ${expectedPlayers.length}`)
    // })

    it('displays each player in the players prop', () => {
        let expectedPlayers = ["steve johannesberg", "ronald blump"];
        wrapper = shallowMount(
            Lobby,
            {
                propsData:
                    {
                        players: expectedPlayers
                    }
            },
        )

        expectedPlayers.forEach(player => {
            expect(wrapper.text()).to.contain(`${player}`)
        })
    })

    it('should show warning when less than 5 players in lobby', () => {
        wrapper = shallowMount(
            Lobby,
            {
                propsData:
                    {
                        players: ["1", "2", "3", "4"]
                    },
            },
        )
        const warningWrapper = wrapper.find('#warning')

        expect(warningWrapper.exists()).to.be.true
    });

    it('should show warning when greater than 10 players in lobby', () => {
        wrapper = shallowMount(
            Lobby,
            {
                propsData:
                    {
                        players: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
                    },
            },
        )
        const warningWrapper = wrapper.find('#warning')

        expect(warningWrapper.exists()).to.be.true
    });

    it('should not show warning when 5 players in lobby', () => {
        wrapper = shallowMount(
            Lobby,
            {
                propsData:
                    {
                        players: ["1", "2", "3", "4", "5"]
                    },
            },
        )
        const warningWrapper = wrapper.find('#warning')

        expect(warningWrapper.exists()).to.be.false
    });

    it('should not show warning when 10 players in lobby', () => {
        wrapper = shallowMount(
            Lobby,
            {
                propsData:
                    {
                        players: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
                    },
            },
        )
        const warningWrapper = wrapper.find('#warning')

        expect(warningWrapper.exists()).to.be.false
    });

    describe('lobby ready form', () => {
        beforeEach(() => {
            stub(WebsocketService, 'sendObj')
        })

        it('should not sendObj with less than 5 players in the lobby', () => {
            wrapper = shallowMount(
                Lobby,
                {
                    propsData:
                        {
                            players: ["", "", "", ""]
                        }
                },
            )
            const lobbyReadyWrapper = wrapper.find('#lobbyReadyForm')

            lobbyReadyWrapper.trigger("submit.prevent")

            assert.notCalled(WebsocketService.sendObj)
        });

        it('should not sendObj with greater than 10 players in the lobby', () => {
            wrapper = shallowMount(
                Lobby,
                {
                    propsData:
                        {
                            players: ["", "", "", "", "", "", "", "", "", "", ""]
                        }
                },
            )
            const lobbyReadyWrapper = wrapper.find('#lobbyReadyForm')

            lobbyReadyWrapper.trigger("submit.prevent")

            assert.notCalled(WebsocketService.sendObj)
        });

        it('should sendObj with 5 players in the lobby', () => {
            wrapper = shallowMount(
                Lobby,
                {
                    propsData:
                        {
                            players: ["", "", "", "", "", ""]
                        },
                },
            )
            const lobbyReadyWrapper = wrapper.find('#lobbyReadyForm')

            lobbyReadyWrapper.trigger("submit.prevent")

            assert.calledOnce(WebsocketService.sendObj)
        });

        it('should sendObj with 10 players in the lobby', () => {
            wrapper = shallowMount(
                Lobby,
                {
                    propsData:
                        {
                            players: ["", "", "", "", "", "", "", "", "", ""]
                        },
                },
            )
            const lobbyReadyWrapper = wrapper.find('#lobbyReadyForm')

            lobbyReadyWrapper.trigger("submit.prevent")

            assert.calledOnce(WebsocketService.sendObj)
        });
    })
})