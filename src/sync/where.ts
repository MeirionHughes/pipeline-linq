export function* where<T>(
  source: Iterable<T>,
  predicate: (item: T, index?: number) => boolean
): Iterable<T> {
  let i = 0;
  for (let item of source) {
    if (predicate(item, i++)) {
      yield item;
    }
  }
}
