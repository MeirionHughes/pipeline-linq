export async function* selectMany<T, R>(
  source: AsyncIterable<T>,
  selector: (item: T, index: number) => AsyncIterable<R>
): AsyncIterable<R> {
  let i = 0;
  for await (const $ of source) {
    for await(const $$ of selector($, i++)) {
      yield $$;
    }
  }
}