export function* skipWhile<T>(
  source: Iterable<T>,
  predicate: (item: T, index?: number) => boolean
): Iterable<T> {
  let i = 0;
  let item: IteratorResult<T>;
  let iterator = source[Symbol.iterator]();

  do {
    item = iterator.next();
  } while (!item.done && predicate(item.value, i++));

  while ((item = iterator.next()) && !item.done) {
    yield item.value;
  }
}