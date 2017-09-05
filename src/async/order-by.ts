import { toArray } from './to-array';

export async function orderBy<T>(
  source: AsyncIterable<T>,
  comparer: (a: T, b: T) => number 
): Promise<T[]> {
  let sorted = (await toArray(source)).sort(comparer);
  return sorted;
}