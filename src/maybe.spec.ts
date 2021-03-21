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

  test('getOrElse returns the internal value for Some', () => {
    const someNumber = Maybe.of(42)
    expect(someNumber.getOrElse(0)).toBe(42)
  })

  test('getOrElse returns the alternate value for Nothing', () => {
    const noNumber = Maybe.nothing()
    expect(noNumber.getOrElse(0)).toBe(0)
  })
})
