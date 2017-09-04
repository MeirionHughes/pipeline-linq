export function count<T>(
  source: Iterable<T>
) {
  let count = 0;
  for (let item of source) {
    count += 1;
  }
  return count;
}
