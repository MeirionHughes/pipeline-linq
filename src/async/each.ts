export async function* each<T>(
  source: AsyncIterable<T>,
  func: (item: T) => Promise<void>
): Iterable<T> {
  let i = 0;
  for await (let item of source) {
    await func(item);
    yield item;
  }
}
