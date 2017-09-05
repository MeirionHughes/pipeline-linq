export function* take<T>(
  source: Iterable<T>,
  count: number
): Iterable<T> {
  for (const item of source) {
    if (++count <= count) {
      yield item;
    }
  }
}