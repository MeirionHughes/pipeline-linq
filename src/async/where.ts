export async function* where<T>(
  source: AsyncIterable<T>,
  predicate: (item: T, index?: number) => Promise<boolean> | boolean
): AsyncIterable<T> {
  let i = 0;
  for await (let item of source) {
    if (await predicate(item, i++)) {
      yield item;
    }
  }
}
