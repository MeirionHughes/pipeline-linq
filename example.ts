import { linq } from './src';

function delay(duration) {
  return new Promise(r => setTimeout(r, duration));
}

let data = {
  async *[Symbol.asyncIterator]() {
    for (let i = 0; i <= 2; i++){
      await delay(100);
      yield i; 
    }
  }
}

async function main() {
  console.log("running...");
  for await (let item of
    linq(data)
      .parallel(async (x) => {
        return x;
      })
  ) {
    console.log("completed", item);
  }
}

main();