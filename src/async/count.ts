export async function count<T>(
  source: AsyncIterable<T>
) {
  let count = 0;
  for await (let item of source) {
    count += 1;
  }
  return count;
}
