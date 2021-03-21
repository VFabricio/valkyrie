type MaybePatterns<T, U> = {
  Some: (value: T) => U,
  Nothing: () => U,
}

abstract class MaybeBase<T> {
  abstract readonly kind: 'Nothing' | 'Some'

  /* eslint-disable-next-line no-use-before-define */
  isNothing(): this is Nothing {
    return this.kind === 'Nothing'
  }

  /* eslint-disable-next-line no-use-before-define */
  isSome(): this is Some<T> {
    return this.kind === 'Some'
  }

  abstract getOrElse(d: T): T

  abstract matchWith<U>(patterns: MaybePatterns<T, U>): U

  /* eslint-disable-next-line no-use-before-define */
  abstract map<U>(transformer: (value: T) => U): Maybe<U>
}

class Nothing extends MaybeBase<never> {
  readonly kind = 'Nothing'

  getOrElse<T>(d: T) {
    return d
  }

  matchWith<T, U>(patterns: MaybePatterns<T, U>): U {
    return patterns.Nothing()
  }

  /* eslint-disable-next-line no-use-before-define, @typescript-eslint/no-unused-vars */
  map<U>(_transformer: (value: never) => U): Maybe<U> {
    return this
  }
}

class Some<T> extends MaybeBase<T> {
  readonly kind = 'Some'

  constructor(public value: T) {
    super()
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  getOrElse(_d: T) {
    return this.value
  }

  matchWith<U>(patterns: MaybePatterns<T, U>): U {
    return patterns.Some(this.value)
  }

  /* eslint-disable-next-line no-use-before-define */
  map<U>(transformer: (value: T) => U): Maybe<U> {
    return new Some(transformer(this.value))
  }
}

type Maybe<T> = Some<T> | Nothing

const of = <T>(value: T): Some<T> => new Some(value)

const nothing = () => new Nothing()

const fromNullable = <T>(value: T): Maybe<T> => (
  value === null || value === undefined ? nothing()
  : /* otherwise */                       of(value)
)

export type { Maybe }
export { of, fromNullable, nothing }
