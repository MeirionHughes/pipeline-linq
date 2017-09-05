export function* select<T, R>(
  source: Iterable<T>,
  selector: (item: T, index: number) => R
): Iterable<R> {
  let i = 0;
  for (let item of source) {
    yield selector(item, i++);
  }
}