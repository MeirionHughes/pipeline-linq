export function* skipWhile<T>(
  source: Iterable<T>,
  predicate: (item: T, index?: number) => boolean
): Iterable<T> {
  let i = 0;
  let pass = false;
  for (let item of source) {
    if (pass || (pass = predicate(item, i++))) {
      yield item;
    }
  }
}