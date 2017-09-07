import { where, select, first } from './src';
import { linq, Linq, _Linq } from './src'

let data = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 9;
    yield 11;
  }
}

async function main() {
  let isNumber = function* (source) {
    for (let item of source) {
      if (typeof item === "number") {
        yield item as number;
      }
    }
  };

  let query = function (source: Iterable<number>) {
    return linq(source)
      .where(x => x >= 2)
      .select(x => x * 2)
  };
  
  let results = linq([1, 2, 5, "hello", true])
    .chain(isNumber)
    .chain(query)
    .skip(1)
    .toArray();

  console.log(results);
}

main().catch(console.log)