import { linq } from './src';


let data = {
  *[Symbol.iterator]() {

  }
}

function delay(duration) {
  return new Promise(r => setTimeout(r, duration));
}

async function main() {
  for await (let item of
    linq(data, true)
      .parallel(async (value) => {
        console.log("execute ", value);
        await delay(value * 1000);
      })
  ) {
    console.log(item);
  }
}

main();