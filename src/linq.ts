import { all as _all } from './methods';
import { any as _any } from './methods';
import { count as _count } from './methods';
import { first as _first } from './methods';
import { last as _last } from './methods';
import { orderBy as _orderBy } from './methods';
import { select as _select } from './methods';
import { selectMany as _selectMany } from './methods';
import { skip as _skip } from './methods';
import { skipWhile as _skipWhile } from './methods';
import { take as _take } from './methods';
import { takeWhile as _takeWhile } from './methods';
import { toArray as _toArray } from './methods';
import { where as _where } from './methods';

import { Newable } from './_newable';
import { TypedArray } from './_typed-array';

export interface Linq<T> extends Iterable<T> {
  all(predicate: (value: T) => boolean): boolean;
  any(predicate: (value: T) => boolean): boolean;

  count(): number;
  toArray(type?: Newable<TypedArray>): T[];

  take(count: number): Linq<T>;
  takeWhile(predicate: (value: T) => boolean): Linq<T>;
  skip(count: number): Linq<T>;
  skipWhile(predicate: (value: T) => boolean): Linq<T>;

  orderBy(comparer: (a: T, b: T) => number): Linq<T>;

  first(predicate?: (value: T) => boolean): T | undefined;
  last(predicate?: (value: T) => boolean): T | undefined;

  where(predicate: (value: T, index: number) => boolean): Linq<T>
  select<R>(selector: (value: T, index: number) => R): Linq<R>
  selectMany<R>(selector: (value: T, index: number) => Iterable<R>): Linq<R>
}

export function linq<T>(
  source: Iterable<T>
): Linq<T> {
  return new _Linq<T>(() => source[Symbol.iterator]());
}

class _Linq<T> implements Linq<T> {
  [Symbol.iterator];
  constructor(private _iterable) { this[Symbol.iterator] = _iterable }

  all(predicate: (value: T) => boolean) {
    return _all(this, predicate);
  }
  any(predicate: (value: T) => boolean) {
    return _any(this, predicate);
  }
  count() {
    return _count(this);
  }
  first(predicate?: (value: T) => boolean): T | undefined {
    return _first(this, predicate);
  }
  last(predicate?: (value: T) => boolean): T | undefined {
    return _last(this, predicate);
  }
  toArray() {
    return _toArray<T>(this);
  }
  orderBy(comparer: (a: T, b: T) => number) {
    return new _Linq<T>(() => _orderBy(this, comparer));
  }
  skip(count: number) {
    return new _Linq<T>(() => _skip(this, count));
  }
  skipWhile(predicate: (value: T) => boolean) {
    return new _Linq<T>(() => _skipWhile(this, predicate));
  }
  take(count: number) {
    return new _Linq<T>(() => _take(this, count));
  }
  takeWhile(predicate: (value: T) => boolean) {
    return new _Linq<T>(() => _takeWhile(this, predicate));
  }
  where(predicate: (value: T, index: number) => boolean) {
    return new _Linq<T>(() => _where(this, predicate));
  }
  select<R>(selector: (value: T, index: number) => R) {
    return new _Linq<R>(() => _select(this, selector));
  }
  selectMany<R>(selector: (value: T, index: number) => Iterable<R>) {
    return new _Linq<R>(() => _selectMany(this, selector));
  }
}