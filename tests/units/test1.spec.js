import { shallowMount, mount } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'
import index from '@/pages/index.vue'
import titleVue from '@/pages/title.vue'
import axios from 'axios'
describe.skip('Jest Hooks', () => {
  beforeAll(() => {
    console.log('beforeAll')
  })
  afterAll(() => {
    console.log('afterAll')
  })
  beforeEach(() => {
    console.log('beforeEach')
  })
  afterEach(() => {
    console.log('afterEach')
  })
  test('1', () => {
    expect(1 + 1).toBe(2)
    console.log('test 1 is done!')
  })
  test('2', () => {
    expect(2 + 1).toBe(3)
    console.log('test 2 is done!')
  })
})
describe.skip('index.vue', () => {
  let wrapper = shallowMount(index)
  test('1', () => {
    expect(wrapper.text()).toBe(
      'PUSH 색상red색상blue색상yellow색상black색상gray색상green색상purple'
    )
  })
})
test.skip('deep equality', () => {
  const obj = {
    name: 'duatpwnd',
    age: 15,
  }
  expect(obj).toStrictEqual({ name: 'duatpwnd', age: 15 })
})
test.skip('Floating point numbers', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3)
})
test.skip('primitive', () => {
  const array = [1, 2, 3, 4, 5]
  expect(array).toContain(1)
  expect(array).toContainEqual(2)
})
test.skip('obj contain', () => {
  const obj = [
    {
      name: 'duatpwnd',
      age: 15,
    },
  ]
  expect(obj).toContainEqual({ name: 'duatpwnd', age: 15 })
})
test.skip('string contain', () => {
  const str = 'make an annotation'
  expect(str).toContain('make')
  expect(str).toMatch('make')
})
function err(isPass) {
  console.log(isPass, !isPass)
  if (!isPass) {
    throw new Error('I am your error.')
  }
}

// 해당 함수가 에러를 던지지 않으면 테스트는 실패합니다.
// 주의할점은 에러함수를 직접 호출 하면 안됨
test.skip('None error', () => {
  expect(err).toThrow()
  // Fails expect(err()).toThrow()
})
function func() {
  return 'success'
}
test.skip('to have been called', () => {
  const wrapper = mount(index)
  console.log(wrapper.vm.message)
  jest.spyOn(wrapper.vm, 'isMobile')
  wrapper.vm.isMobile()
  expect(wrapper.vm.isMobile).toHaveBeenCalled()
})
const user = {
  name: 'duatpwnd', // None name..
  getName() {
    if (!this.name) {
      throw new Error('Not Neo!')
    }
    return this.name
  },
}

function displayName(user) {
  try {
    return user.getName()
  } catch (err) {
    // console.error(err)
  }
}

test.skip('Called', () => {
  jest.spyOn(user, 'getName') // 이제 해당 함수를 감시합니다.
  displayName(user)
  expect(user.getName).toHaveBeenCalled() // Passes
  expect(user.getName).toHaveReturned() // Fails
  expect(user.getName).toHaveReturnedWith('duatpwnd')
})
const obj = {
  name: 'Neo',
  age: 85,
  address: {
    address1: '서울특별시 종로구 종로 6',
    sido: '서울특별시',
    zonecode: '03187',
  },
  belongings: ['phone', 'laptop', { mouse: 'MX Vertical' }, [100, 1000]],
  girlFriend: undefined,
  getName() {
    return this.name
  },
}
test.skip('to_have_property', () => {
  expect(obj).toHaveProperty('name') // 속성 확인
  expect(obj).toHaveProperty('name', 'Neo') // 속성 , 값 확인
  expect(obj).toHaveProperty('address.address1', '서울특별시 종로구 종로 6')
  expect(obj).toHaveProperty(['belongings', 0])
  expect(obj).toHaveProperty(['belongings', 0], 'phone')
  expect(obj).toHaveProperty(['belongings', 2, 'mouse'], 'MX Vertical')
  expect(obj).toHaveProperty(['belongings', 3, 0], 100)
  expect(obj).toHaveProperty('girlFriend')
  expect(obj).toHaveProperty('getName')
})
test.skip('find element', () => {
  const wrapper = shallowMount(index)
  const html = wrapper.find('div')
  const result = html.html()
  expect(result).toBe(`<div class="container"><button>PUSH</button>
  <div class="example-3d">
    <swiper-stub defaultoptions="[object Object]" options="[object Object]" autoupdate="true" autodestroy="true" deleteinstanceondestroy="true" cleanupstylesondestroy="true" class="swiper">
      <swiper-slide-stub style="background: red;">색상red</swiper-slide-stub>
      <swiper-slide-stub style="background: blue;">색상blue</swiper-slide-stub>
      <swiper-slide-stub style="background: yellow;">색상yellow</swiper-slide-stub>
      <swiper-slide-stub style="background: black;">색상black</swiper-slide-stub>
      <swiper-slide-stub style="background: gray;">색상gray</swiper-slide-stub>
      <swiper-slide-stub style="background: green;">색상green</swiper-slide-stub>
      <swiper-slide-stub style="background: purple;">색상purple</swiper-slide-stub>
    </swiper-stub>
  </div>
</div>`)
})
// 모의 함수 만들기
describe('created jest', () => {
  let wrapper
  beforeEach(async () => {
    const response0 = {
      data: {
        title: 'created hook',
      },
    }
    const response1 = {
      data: {
        title: 'mounted hook',
      },
    }
    const mock = new MockAdapter(axios)
    await mock.onGet('/api/jest1').reply(200, JSON.stringify(response0))
    await mock.onGet('/api/jest2').reply(200, JSON.stringify(response1))
    wrapper = shallowMount(titleVue)
  })

  test('가져온 텍스트가 정상적으로 렌더링', () => {
    console.log(wrapper.html())
  })
  test('인덱스 뷰에 isMobile 함수 테스트', () => {
    const wrapper = shallowMount(index)
    const result = wrapper.vm.isMobile()
    expect(result).toBe(false)
  })
})
