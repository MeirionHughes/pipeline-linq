export function first<T>(
  source: Iterable<T>,
  predicate: (item: T) => boolean = function () { return true }
): T | undefined {
  for (let item of source) {
    if (predicate(item)) {
      return item;
    }
  }
}