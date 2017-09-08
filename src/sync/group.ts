export function group<T, K, E, R>(
  source: Iterable<T>,
  key: (value: T) => K,
  element: (value: T) => E = (x: any) => x,
  select: (a: K, b: Iterable<E>) => R
) {
  let a = false;
  for (const item of source) {
    return false;
  }
  return a;
}