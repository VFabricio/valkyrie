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

  test('matchWith works on Some', () => {
    const someNumber = Maybe.of(42)
    const result = someNumber.matchWith({
      Some: () => 'yes',
      Nothing: () => 'no',
    })

    expect(result).toBe('yes')
  })

  test('matchWith works on Nothing', () => {
    const noNumber = Maybe.nothing()
    const result = noNumber.matchWith({
      Some: () => 'yes',
      Nothing: () => 'no',
    })

    expect(result).toBe('no')
  })

  test('fromNullable works with null', () => {
    const maybeNumber = Maybe.fromNullable(null)
    expect(maybeNumber.isNothing()).toBe(true)
  })

  test('fromNullable works with undefined', () => {
    const maybeNumber = Maybe.fromNullable(undefined)
    expect(maybeNumber.isNothing()).toBe(true)
  })

  test('fromNullable works with other falsy values', () => {
    const maybeNumber = Maybe.fromNullable(0)
    expect(maybeNumber.isSome()).toBe(true)
  })

  test('fromNullable works with truthy values', () => {
    const maybeNumber = Maybe.fromNullable(42)
    expect(maybeNumber.isSome()).toBe(true)
  })
})
