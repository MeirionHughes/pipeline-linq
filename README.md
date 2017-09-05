# pipeline-linq
sync and async generators/helpers to form linq-like iterable queries, complete will full typescript and es2015 `module` support. 

## Install
install with either npm or yarn: 

* `npm install pipeline-linq`
* `yarn add pipeline-linq`

## Dependencies

For versions `pipeline-linq @ < 1.0`, this package, when imported,  will polyfill the `Symbol.asyncIterator` using `core-js`. 

## Basic Usage

`linq` is a helper function used to wrap and chain pipeline methods together. Simply pass through an object that implements `[Symbol.iterator]`

```ts
import {linq} from 'pipeline-linq'

let data = {
  *[Symbol.iterator](){
    yield 1; 
    yield 2; 
    yield 3; 
    yield 4;
  }
}

let result = 
  linq(data)
    .where(x=>x > 2)
    .select(x=>x * 2)
    .first();

console.log(result);
```

By default the call to `linq` returns the synchronous query, you can switch to the async equivalents by passing through `true` at the end of most supporting methods. 

Converting to an async query will cause all subsequent method calls to be evaluated using the `Symbol.asyncIterator` and you must await the resulting promise or use `for-await` to iterate the query. 

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

You can use the sync generators directly by importing them: 

```ts
import { where, select, first } from 'pipeline-linq';

let data = [1, 2, 3, 4];

let where_ = where(data, x => x > 2);
let select_ = select(where_, x => x * 2);
let result = first(select_);
```

## Pipeline Operator
> see proposal [pipeline-operator](https://github.com/tc39/proposal-pipeline-operator)

**Subject to change.**
All generators and helper methods take the source as the first parameter and so will be readily available to use with the pipeline operator. For now, you could use the [babel transformer](https://www.npmjs.com/package/babel-plugin-transform-pipeline) and use:  

```ts
import { where, select, first } from 'pipeline-linq';

let result = [1, 2, 3, 4] 
  |> _ => where(_, x => x > 2)
  |> _ => select(_, x => x * 2)
  |> _ => first(_);
```

it is hoped the final syntax will more or less resemble: 

```js
let result = [1, 2, 3, 4] 
  :: where(x => x > 2)
  :: select(x => x * 2)
  :: first();
```


