import { toArray } from './to-array';

export function orderBy<T>(
  source: Iterable<T>,
  comparer: (a: T, b: T) => number
): T[] & Iterable<T> {
  let sorted = toArray(source).sort(comparer);
  return sorted;
}