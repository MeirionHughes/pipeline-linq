export async function last<T>(
  source: AsyncIterable<T>,
  predicate: (item: T) => boolean | Promise<boolean> = function () { return true }
): Promise<T | undefined> {
  let found;
  for await(let item of source) {
    if (predicate(item)) {
      found = item;
    }
  }
  return found;
}