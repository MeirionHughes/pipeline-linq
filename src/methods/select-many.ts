export function* selectMany<T, R>(
  source: Iterable<T>,
  selector: (item: T, index: number) => Iterable<R>
): Iterable<R> {
  let i = 0;
  for (const $ of source) {
    for (const $$ of selector($, i++)) {
      yield $$;
    }
  }
}