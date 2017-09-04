import { where as _where } from './methods';
import { select as _select } from './methods';

export interface Linq<T> extends Iterable<T> {
  where: (predicate: (x) => boolean) => Linq<T>;
  select: <R>(selector: (x: T) => R) => Linq<R>;
}

export function linq<T>(
  source: Iterable<T>
) {
  return new _Linq<T>(source);
}

class _Linq<T> implements Linq<T> {
  constructor(
    private _source: Iterable<T>,
    ...args: any[]
  ) {
    this[Symbol.iterator]
  }
  [Symbol.iterator]
  where = (predicate: (x) => boolean) => linq(_where(this, predicate));
  select = <R>(selector: (x: T) => R) => linq(_select(this, selector));
}