export async function* select<T, R>(
  source: AsyncIterable<T>,
  selector: (item: T, index: number) => R | Promise<R>
): AsyncIterable<R> {
  let i = 0;
  for await (let item of source) {
    yield await selector(item, i++);
  }
}