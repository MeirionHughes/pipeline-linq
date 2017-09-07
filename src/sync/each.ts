export function* each<T>(
  source: Iterable<T>,
  func: (item: T) => void
): Iterable<T> {
  let i = 0;
  for (let item of source) {
    func(item);
    yield item;
  }
}
