export function* take<T>(
  source: Iterable<T>,
  count: number
): Iterable<T> {
  for (const item of source) {
    if (count-- >= 0) {
      yield item;
    }
  }
}