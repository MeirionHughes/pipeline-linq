import { where, select, first } from './src';
import {linq} from './src'

let data = {
  *[Symbol.iterator](){
    yield 1; 
    yield 2; 
    yield 3; 
    yield 4;
  }
}

async function main() {
  let query = linq(data)
    .where(x => x > 2, true)
    .select(x => x * 2);

  for await (let value of query) {
    console.log(value);
  }
}
main();