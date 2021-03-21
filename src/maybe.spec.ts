import * as Maybe from './maybe'

describe('maybe', () => {
  test('of is some', () => {
    const someNumber = Maybe.of(42)
    expect(someNumber.isSome()).toBe(true)
  })

  test('of is not nothing', () => {
    const someNumber = Maybe.of(42)
    expect(someNumber.isNothing()).toBe(false)
  })

  test('nothing is not some', () => {
    const noNumber = Maybe.nothing()
    expect(noNumber.isSome()).toBe(false)
  })

  test('nothing is nothing', () => {
    const noNumber = Maybe.nothing()
    expect(noNumber.isNothing()).toBe(true)
  })
})
