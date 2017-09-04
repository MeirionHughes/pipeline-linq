export function* takeWhile<T>(
  source: Iterable<T>,
  predicate: (item: T, index?: number) => boolean
): Iterable<T> {
  let i = 0;
  for (const item of source) {
    if (!predicate(item, i++)) {
      break;
    }
    yield item;
  }
}