import { linq } from './src';

let items = [1, 2, 3, 4];

let set = linq(linq(items));

for (let item of set){
  console.log(item);
}

for (let item of set){
  console.log(item);
}