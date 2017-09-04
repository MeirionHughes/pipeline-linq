export function toArray<T>(
  source: Iterable<T>
): T[] {
  let items: T[] = [], i = 0;
  for (const item of source) items.push(item);
  return items;
}