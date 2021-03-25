type ResultPatterns<S, F, T> = {
  Success: (value: S) => T,
  Failure: (error: F) => T,
}

abstract class ResultBase<S, F> {
  abstract readonly kind: 'Success' | 'Failure'

  /* eslint-disable-next-line no-use-before-define */
  isFailure(): this is Failure<S, F> {
    return this.kind === 'Failure'
  }

  /* eslint-disable-next-line no-use-before-define */
  isSuccess(): this is Success<S, F> {
    return this.kind === 'Success'
  }

  /* eslint-disable-next-line no-use-before-define */
  abstract chain<T>(transformer: (value: S) => Result<T, F>): Result<T, F>

  abstract getOrElse(handleError: (error: F) => S): S

  /* eslint-disable-next-line no-use-before-define */
  abstract map<T>(transformer: (value: S) => T): Result<T, F>

  abstract matchWith<T>(patterns: ResultPatterns<S, F, T>): T
}

class Failure<S, F> extends ResultBase<S, F> {
  readonly kind = 'Failure'

  constructor(public error: F) {
    super()
  }

  /* eslint-disable-next-line no-use-before-define, @typescript-eslint/no-unused-vars */
  chain<T>(_transformer: (value: S) => Result<T, F>): Result<T, F> {
    /* eslint-disable-next-line no-use-before-define */
    return this as unknown as Result<T, F>
  }

  getOrElse(handleError: (error: F) => S): S {
    return handleError(this.error)
  }

  /* eslint-disable-next-line no-use-before-define, @typescript-eslint/no-unused-vars */
  map<T>(_transformer: (value: S) => T): Result<T, F> {
    /* eslint-disable-next-line no-use-before-define */
    return this as unknown as Result<T, F>
  }

  matchWith<T>(patterns: ResultPatterns<S, F, T>): T {
    return patterns.Failure(this.error)
  }
}

class Success<S, F> extends ResultBase<S, F> {
  readonly kind = 'Success'

  constructor(public value: S) {
    super()
  }

  /* eslint-disable-next-line no-use-before-define */
  chain<T>(transformer: (value: S) => Result<T, F>): Result<T, F> {
    return transformer(this.value)
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  getOrElse(_handleError: (error: F) => S): S {
    return this.value
  }

  /* eslint-disable-next-line no-use-before-define */
  map<T>(transformer: (value: S) => T): Result<T, F> {
    return new Success(transformer(this.value))
  }

  matchWith<T>(patterns: ResultPatterns<S, F, T>): T {
    return patterns.Success(this.value)
  }
}

type Result<S, F> = Success<S, F> | Failure<S, F>

const of = <S, F>(value: S): Success<S, F> => new Success(value)

const fail = <S, F>(error: F): Failure<S, F> => new Failure(error)

const _try = <S>(testedFunction: () => S): Result<S, unknown> => {
  try {
    return of(testedFunction())
  } catch (e) {
    return fail(e) as Result<S, unknown>
  }
}

export type { Result }
export { fail, of, _try }
