import { linq } from './src';

let items = [1, 2, 3, 4];

let set = linq(items)
  .where(x => x > 2)
  .selectMany(function* (x) {
    for (let i = 0; i < x; i++) {
      yield i;
    }
  })
  .select(x=>x.toString());

for (let item of set) {
  console.log(item);
}