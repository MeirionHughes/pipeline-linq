import { Mutex } from '../mutex';

export async function* parallel<T, R>(
  source: AsyncIterable<T>,
  func: (x: T) => Promise<R>
): AsyncIterable<R> {

  let runningResolve;
  let running = new Promise(r => runningResolve = r);

  let resultResolve;
  let result = new Promise(r => resultResolve = r);

  let runningCount = 0;
  let mutex = new Mutex();
  let results: R[] = [];
  let error: any;

  // Consume items from the source, run, and pump triggers on complete
  let consumer = new Promise(async (r, x) => {
    try {
      for await (const item of source) {
        runningCount += 1;
        runningResolve();
        func(item)
          .then(async (data) => {
            await mutex.runExclusive(() => {
              results.push(data);
              runningCount -= 1;
            });
            resultResolve();
          });
      }
    }
    catch (err) { x(err); }
    r();
  });

  //guard against empty source
  let task = await Promise.race([running, consumer]);

  let consumedAll = task === consumer;

  if (task === consumer && runningCount === 0)
    return;

  let stillRunning = runningCount;
  let available;
  let consumed = false;

  do {
    let tasks = [result];

    if (!consumedAll) {
      tasks.push(consumer);
    }
    
    let winner = await Promise.race([result, consumer]);

    consumedAll = winner == consumer;

    await mutex.runExclusive(() => {
      result = new Promise(r => resultResolve = r);
      stillRunning = runningCount;
      available = results;
      results = [];

    });
    for (let item of available) {
      yield item;
    }
    console.log("stillRunning", stillRunning);
  } while (stillRunning > 0)
  console.log("exit parallel");
}