export async function toArray<T>(
  source: AsyncIterable<T>
): Promise<T[]> {
  let items: T[] = [], i = 0;
  for await (const item of source) items.push(item);
  return items;
}