import { EventEmitter } from 'events';
import { Mutex } from 'async-mutex';

export async function* parallel<T, R>(
  source: AsyncIterable<T>,
  func: (x: T) => Promise<R>
): AsyncIterable<R> {

  let mutex = new Mutex();
  
  let complete = [];
  let consumed = 0;

  // Consume items from the source;
  let consumer = new Promise(async (r, x) => {
    try {
      for await (const item of source) {
        consumed += 1;
        func(item)
          .catch(x)
          .then((result) => {
            complete.push(item);
            console.log("emit next");
            signal.emit("next");
          });
      }
    }
    catch (err) { x(err); }
    r();
  });

  let produced = 0;
  let first = true;

  do {
    console.log("entering loop... ");

    if (first) {
      await Promise.race([new Promise(_ => {
        signal.once("next", _);
      }), consumer]);
      first = false;
    }

    if (complete.length == 0) {
      console.log("breaking out...");
      break;
    }

    while (complete.length > 0) {
      let foo = complete.shift();
      console.log("shifted: " + foo);
      produced += 1;
      yield foo;
    }
  } while (produced < consumed);

  console.log("exited loop...");
  await consumer;
}

function promiseState(p) {
  const t = {};
  return Promise.race([p, t])
    .then(v => (v === t) ? "pending" : "fulfilled", () => "rejected");
}