export async function all<T>(
  source: AsyncIterable<T>,
  predicate: (x: T) => boolean | Promise<boolean>
) {
  let a = false;
  for await (const item of source) {
    if (!await predicate(item))
      return false;
    a = true;
  }
  return a;
}