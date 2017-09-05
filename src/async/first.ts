export async function first<T>(
  source: AsyncIterable<T>,
  predicate: (item: T) => boolean | Promise<boolean> = function () { return true }
): Promise<T | undefined> {
  for await (let item of source) {
    if (await predicate(item)) {
      return item;
    }
  }
}