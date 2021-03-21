import * as Maybe from './maybe'

describe('maybe', () => {
  describe('of', () => {
    it('is Some', () => {
      const someNumber = Maybe.of(42)
      expect(someNumber.isSome()).toBe(true)
    })

    it('is not Nothing', () => {
      const someNumber = Maybe.of(42)
      expect(someNumber.isNothing()).toBe(false)
    })
  })

  describe('nothing', () => {
    it('is not Some', () => {
      const noNumber = Maybe.nothing()
      expect(noNumber.isSome()).toBe(false)
    })

    it('is Nothing', () => {
      const noNumber = Maybe.nothing()
      expect(noNumber.isNothing()).toBe(true)
    })
  })

  describe('getOrElse', () => {
    it('returns the internal value for Some', () => {
      const someNumber = Maybe.of(42)
      expect(someNumber.getOrElse(0)).toBe(42)
    })

    it('returns the alternate value for Nothing', () => {
      const noNumber = Maybe.nothing()
      expect(noNumber.getOrElse(0)).toBe(0)
    })
  })

  describe('matchWith', () => {
    it('works on Some', () => {
      const someNumber = Maybe.of(42)
      const result = someNumber.matchWith({
        Some: () => 'yes',
        Nothing: () => 'no',
      })

      expect(result).toBe('yes')
    })

    it('works on Nothing', () => {
      const noNumber = Maybe.nothing()
      const result = noNumber.matchWith({
        Some: () => 'yes',
        Nothing: () => 'no',
      })

      expect(result).toBe('no')
    })
  })

  describe('fromNullable', () => {
    it('works with null', () => {
      const maybeNumber = Maybe.fromNullable(null)
      expect(maybeNumber.isNothing()).toBe(true)
    })

    it('works with undefined', () => {
      const maybeNumber = Maybe.fromNullable(undefined)
      expect(maybeNumber.isNothing()).toBe(true)
    })

    it('works with other falsy values', () => {
      const maybeNumber = Maybe.fromNullable(0)
      expect(maybeNumber.isSome()).toBe(true)
    })

    it('works with truthy values', () => {
      const maybeNumber = Maybe.fromNullable(42)
      expect(maybeNumber.isSome()).toBe(true)
    })
  })

  describe('map', () => {
    it('works with Some', () => {
      const someNumber = Maybe.of(42)
      const mappedNumber = someNumber.map(x => x + 1)
      expect(mappedNumber.getOrElse(0)).toBe(43)
    })

    it('works with Nothing', () => {
      const noNumber = Maybe.nothing()
      const mappedNumber = noNumber.map(x => x + 1)
      expect(mappedNumber.getOrElse(0)).toBe(0)
    })
  })
})
