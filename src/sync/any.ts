export function any<T>(
  source: Iterable<T>,
  predicate?: (item: T) => boolean
) {
  if (predicate == undefined) {
    for (const $ of source) return true;
  } else {
    for (const $ of source) if (predicate($)) return true;
  }
  return false;
}
