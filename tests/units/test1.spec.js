import { mount } from '@vue/test-utils'
import index from '@/pages/index.vue'
import axios from 'axios'
const mock = new MockAdapter(axios)
describe('Jest Hooks', () => {
  test('isMobile func', () => {
    expect(mount(index).vm.isMobile()).toBeFalsy()
  })
  test('가져온 텍스트가 정상적으로 렌더링', () => {
    const orderData = {
      mobile_token: null,
      pc_token: 'b',
    }
    mock.onGet(`/api`).reply(200, { body: orderData })
  })
})
