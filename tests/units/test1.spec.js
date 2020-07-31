import { mount } from '@vue/test-utils'
import index from '@/pages/index.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
const mock = new MockAdapter(axios)
describe('Jest Hooks', () => {
  test('isMobile func', () => {
    expect(mount(index).vm.isMobile()).toBeFalsy()
  })
  test('/api 호출', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        id: 'ss',
      },
    })
    const user = await mount(index).vm.jest_test()
    console.log(user)
    expect(user).toHaveProperty('id', 'ss')
  })
})
