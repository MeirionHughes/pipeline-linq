export async function* skipWhile<T>(
  source: AsyncIterable<T>,
  predicate: (item: T, index?: number) => boolean | Promise<boolean>
): AsyncIterable<T> {
  let i = 0;
  let pass = false;
  for await (let item of source) {
    if (pass || (pass = await predicate(item, i++))) {
      yield item;
    }
  }
}