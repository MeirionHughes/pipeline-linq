import { linq } from './src';


let set = linq(new Float32Array([1, 2, 3, 4]))
  .where(x => x > 2)
  .selectMany(function* (x) {
    for (let i = 0; i < x; i++) {
      yield i;
    }
  })
  .toArray(Float32Array);


for (let item of set) {
  console.log(item);
}