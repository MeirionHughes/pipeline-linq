import { Newable } from '../_newable';
import { TypedArray } from '../_typed-array';

export function toArray<T>(
  source: Iterable<T>
): T[]
export function toArray<T, TArray extends TypedArray>(
  source: Iterable<T>,
  type: Newable<TArray>
): TArray
export function toArray<T, TArray extends TypedArray>(
  source: Iterable<T>,
  type?: Newable<TArray>
): TArray | T[] {   
  if (type !== undefined){
    /*let cache = new Array(32);
    let count = 0;
    //let array = new TypeArray(32);
    for (const item of source){
      count += 1;
    }*/
  } else {
    let items: T[] = [], i = 0;
    for (const item of source) items.push(item);
    return items;
  }
}