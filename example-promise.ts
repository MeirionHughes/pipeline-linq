import { where, select, first } from './src';
import { linq } from './src'

let data = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }
}

async function main() {

  for (let item of await Promise.resolve(data)
    .then(_ => where(_, x => x > 2))
    .then(_ => select(_, x => x * 2))) {
    console.log(item);
  }
}

main();