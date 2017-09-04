export function last<T>(
  source: Iterable<T>,
  predicate: (item: T) => boolean = function () { return true }
) {
  let found;
  for (let item of source) {
    if (predicate(item)) {
      found = item;
    }
  }
  return found;
}