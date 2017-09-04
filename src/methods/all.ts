export function all<T>(
  source: Iterable<T>,
  predicate: (x: T) => boolean
) {
  let a = false;
  for (const item of source) {
    if (!predicate(item))
      return false;
    a = true;
  }
  return a;
}