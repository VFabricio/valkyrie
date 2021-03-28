import * as Result from './result'

describe('result', () => {
  describe('of', () => {
    it('is Success', () => {
      const successNumber = Result.success(42)
      expect(successNumber.isSuccess()).toBe(true)
    })

    it('is not Failure', () => {
      const successNumber = Result.success(42)
      expect(successNumber.isFailure()).toBe(false)
    })
  })

  describe('fail', () => {
    it('is not Success', () => {
      const failureNumber = Result.fail(42)
      expect(failureNumber.isSuccess()).toBe(false)
    })

    it('is Failure', () => {
      const failureNumber = Result.fail(42)
      expect(failureNumber.isFailure()).toBe(true)
    })
  })

  describe('getOrElse', () => {
    it('returns the internal value for Success', () => {
      const successNumber = Result.success(42)
      expect(successNumber.getOrElse(() => 0)).toBe(42)
    })

    it('runs the error handler for Failure', () => {
      const failureNumber = Result.fail(1000)
      expect(failureNumber.getOrElse(() => 0)).toBe(0)
    })

    test('the error handler receives the error', () => {
      const failureNumber = Result.fail(0)
      expect(failureNumber.getOrElse(x => x)).toBe(0)
    })
  })

  describe('_try', () => {
    it('wraps the return in Success if the tested function does not throw', () => {
      const doesNotThrow = () => 42
      const result = Result._try(doesNotThrow)

      expect(result.getOrElse(() => 0)).toBe(42)
    })

    it('wraps a thrown error in Failure', () => {
      const itThrows = () => {
        throw new Error('kaboom')
      }
      const result = Result._try<number>(itThrows)

      expect(result.getOrElse(() => 0)).toBe(0)
    })
  })

  describe('matchWith', () => {
    it('works on Success', () => {
      const successNumber = Result.success(42)
      const result = successNumber.matchWith({
        Success: () => 'yes',
        Failure: () => 'no',
      })

      expect(result).toBe('yes')
    })

    it('works on Failure', () => {
      const failureNumber = Result.fail(0)
      const result = failureNumber.matchWith({
        Success: () => 'yes',
        Failure: () => 'no',
      })

      expect(result).toBe('no')
    })
  })

  describe('map', () => {
    it('works with Success', () => {
      const successNumber = Result.success(42)
      const mappedNumber = successNumber.map(x => x + 1)
      expect(mappedNumber.getOrElse(() => 0)).toBe(43)
    })

    it('works with Failure', () => {
      const failureNumber = Result.fail(0) as Result.Result<number, number>
      const mappedNumber = failureNumber.map(x => x + 1)
      expect(mappedNumber.getOrElse(x => x)).toBe(0)
    })
  })

  describe('chain', () => {
    it('works with Success to Success', () => {
      const successNumber = Result.success(42)
      const anotherResultNumber = successNumber.chain(x => Result.success(x))

      expect(anotherResultNumber.getOrElse(() => 0)).toBe(42)
    })

    it('works with Success to Failure', () => {
      const successNumber = Result.success(42)
      const anotherResultNumber = successNumber.chain(() => Result.fail(0))

      expect(anotherResultNumber.getOrElse(x => x)).toBe(0)
    })

    it('works with Failure to Success', () => {
      const failureNumber = Result.fail(0)
      const anotherResultNumber = failureNumber.chain(() => Result.success(42))

      expect(anotherResultNumber.getOrElse(x => x)).toBe(0)
    })

    it('works with Failure to Failure', () => {
      const failureNumber = Result.fail(0)
      const anotherResultNumber = failureNumber.chain(() => Result.fail(1000))

      expect(anotherResultNumber.getOrElse(x => x)).toBe(0)
    })
  })
})
