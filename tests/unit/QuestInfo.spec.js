import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import QuestInfo from "../../src/components/QuestInfo";

let wrapper

describe('QuestInfo.vue', () => {
    it('should display 5 quests', () => {
        wrapper = shallowMount(
            QuestInfo,
            {
                propsData: {
                    quests: [{}, {}, {}, {}, {}]
                }
            })

        const questsWrapper = wrapper.findAll('.quest')

        expect(questsWrapper.length).to.equal(5)
    })
})
