export async function any<T>(
  source: AsyncIterable<T>,
  predicate?: (item: T) => boolean | Promise<boolean>
) {
  if (predicate == undefined) {
    for await (const $ of source) return true;
  } else {
    for await (const $ of source) if (await predicate($)) return true;
  }
  return false;
}
