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
}

class Nothing extends MaybeBase<never> {
  readonly kind = 'Nothing'

  getOrElse<T>(d: T) {
    return d
  }

  matchWith<T, U>(patterns: MaybePatterns<T, U>): U {
    return patterns.Nothing()
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
}

type Maybe<T> = Some<T> | Nothing

const of = <T>(value: T): Some<T> => new Some(value)
const nothing = () => new Nothing()

export type { Maybe }
export { of, nothing }
