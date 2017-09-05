# pipeline-async-linq
sync and async linq generators and helpers, with complete typescript support. 

## Install
install with either npm or yarn: 

* `npm install pipeline-linq`
* `yarn add pipeline-linq`

## Dependencies

for versions `pipeline-linq@ < 1.0`, the package will polyfill the `Symbol.asyncIterator` using `core-js` when the package is imported

## Basic Usage

`linq` is a helper function used to wrap and chain pipeline methods together. Simply pass through an object that implements `[Symbol.iterator]`

```ts
import {linq} from 'pipeline-linq'

let data = [1, 2, 3, 4]; 

let result = 
  linq(data)
    .where(x=>x > 2)
    .select(x=>x * 2)
    .first();

console.log(result);
```

By default the call to `linq` returns the synchronous pipeline, you can switch to the async equivalents by passing through `true` at the end of most supporting methods. 

Converting to an async pipeline will cause all subsequent method calls to be evaluated using the `Symbol.asyncIterator` and you must await the resulting promise or use `for-await` to iterate. 

```ts
import {linq} from 'pipeline-linq'

let data = [1, 2, 3, 4]; 

async function main() {
  let query = linq(data)
    .where(x => x > 2)
    .select(async x => x * 2, true);

  for await (let value of query) {
    console.log(value);
  }
}
main();
```

>note: when using `linq` the evaluation of the iterators is lazy, thus you _can_ iterate over `query` multiple times. 

## Generators 

You can use the generators directly importing them: 

```ts
import { where, select, first } from './src';

let data = [1, 2, 3, 4];

let where_ = where(data, x => x > 2);
let select_ = select(where_, x => x * 2);
let result = first(select_);
```

## Pipeline Operator
> see proposal [pipeline-operator](https://github.com/tc39/proposal-pipeline-operator)


