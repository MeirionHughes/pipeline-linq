export async function* await<T>(
  source: AsyncIterable<Promise<T>>
) {
  let a = false;
  for await (const item of source) {
    yield await item;    
  }
  return a;
}