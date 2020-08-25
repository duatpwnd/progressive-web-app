import { shallowMount, mount } from '@vue/test-utils'
import index from '@/pages/index.vue'
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
