import { all as _all } from './sync';
import { any as _any } from './sync';
import { count as _count } from './sync';
import { first as _first } from './sync';
import { last as _last } from './sync';
import { orderBy as _orderBy } from './sync';
import { select as _select } from './sync';
import { selectMany as _selectMany } from './sync';
import { skip as _skip } from './sync';
import { skipWhile as _skipWhile } from './sync';
import { take as _take } from './sync';
import { takeWhile as _takeWhile } from './sync';
import { toArray as _toArray } from './sync';
import { where as _where } from './sync';

import { all as _allAsync } from './async';
import { any as _anyAsync } from './async';
import { count as _countAsync } from './async';
import { first as _firstAsync } from './async';
import { last as _lastAsync } from './async';
import { orderBy as _orderByAsync } from './async';
import { select as _selectAsync } from './async';
import { selectMany as _selectManyAsync } from './async';
import { skip as _skipAsync } from './async';
import { skipWhile as _skipWhileAsync } from './async';
import { take as _takeAsync } from './async';
import { takeWhile as _takeWhileAsync } from './async';
import { toArray as _toArrayAsync } from './async';
import { where as _whereAsync } from './async';

export function linq<T>(
  source: Iterable<T>
): Linq<T>
export function linq<T>(
  source: Iterable<T>,
  async: true
): LinqAsync<T>
export function linq<T>(
  source: AsyncIterable<T>
): LinqAsync<T>
export function linq<T>(
  source: Iterable<T> | AsyncIterable<T>,
  async?: true
): Linq<T> | LinqAsync<T> {

  if (source[Symbol.asyncIterator] !== undefined) {
    return new _LinqAsync<T>(() => source[Symbol.asyncIterator]())
  }
  if (async) {
    return new _LinqAsync<T>(() => { return source[Symbol.iterator]() })
  }
  return new _Linq<T>(() => source[Symbol.iterator]());
}

export interface Linq<T> extends Iterable<T> {
  all(predicate: (value: T) => boolean): boolean;
  any(predicate: (value: T) => boolean): boolean;
  count(): number;
  first(predicate?: (value: T) => boolean): T | undefined;
  last(predicate?: (value: T) => boolean): T | undefined;
  orderBy(comparer: (a: T, b: T) => number): Linq<T>;
  takeWhile(predicate: (value: T) => boolean): Linq<T>;
  take(count: number): Linq<T>;
  skipWhile(predicate: (value: T) => boolean): Linq<T>;
  skip(count: number): Linq<T>;
  skipWhile(predicate: (value: T) => boolean): Linq<T>;
  selectMany<R>(selector: (value: T, index: number) => Iterable<R>): Linq<R>
  select<R>(selector: (value: T, index: number) => R): Linq<R>
  toArray(): T[];
  where(predicate: (value: T, index: number) => boolean): Linq<T>
  where(predicate: (value: T, index: number) => boolean | Promise<boolean>, async: true): LinqAsync<T>
}

export interface LinqAsync<T> extends AsyncIterable<T> {
  all(predicate: (value: T) => boolean | Promise<boolean>);
  any(predicate: (value: T) => boolean | Promise<boolean>);
  count(): Promise<number>
  first(predicate?: (value: T) => boolean | Promise<boolean>): Promise<T | undefined>;
  last(predicate?: (value: T) => boolean | Promise<boolean>): Promise<T | undefined>;
  orderBy(comparer: (a: T, b: T) => number):LinqAsync<T>
  selectMany<R>(selector: (value: T, index: number) => AsyncIterable<R>);
  select<R>(selector: (value: T, index: number) => R | Promise<R>);
  skipWhile(predicate: (value: T) => boolean | Promise<boolean>);
  skip(count: number):LinqAsync<T>
  takeWhile(predicate: (value: T) => boolean | Promise<boolean>);
  take(count: number):LinqAsync<T>
  toArray():Promise<T[]>
  where(predicate: (value: T, index: number) => boolean | Promise<boolean>):LinqAsync<T>;
}

class _Linq<T> implements Linq<T> {
  [Symbol.iterator]
  [Symbol.asyncIterator];
  constructor(private _iterable) {
    this[Symbol.asyncIterator] = this[Symbol.iterator] = _iterable
  }

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
  orderBy(comparer: (a: T, b: T) => number) {
    return new _Linq<T>(() => _orderBy(this, comparer));
  }
  selectMany<R>(selector: (value: T, index: number) => Iterable<R>) {
    return new _Linq<R>(() => _selectMany(this, selector));
  }
  select<R>(selector: (value: T, index: number) => R) {
    return new _Linq<R>(() => _select(this, selector));
  }
  skipWhile(predicate: (value: T) => boolean) {
    return new _Linq<T>(() => _skipWhile(this, predicate));
  }
  skip(count: number) {
    return new _Linq<T>(() => _skip(this, count));
  }
  takeWhile(predicate: (value: T) => boolean) {
    return new _Linq<T>(() => _takeWhile(this, predicate));
  }
  take(count: number) {
    return new _Linq<T>(() => _take(this, count));
  }
  toArray() {
    return _toArray<T>(this);
  }
  where(predicate: (value: T, index: number) => boolean): Linq<T>
  where(predicate: (value: T, index: number) => boolean | Promise<boolean>, async: true): LinqAsync<T>
  where(predicate: (value: T, index: number) => boolean, async?: true): Linq<T> | LinqAsync<T> {
    if (async) {
      return new _LinqAsync(() => _whereAsync(this, predicate))
    }
    return new _Linq<T>(() => _where(this, predicate));
  }
}

class _LinqAsync<T> implements LinqAsync<T> {
  [Symbol.iterator]
  [Symbol.asyncIterator];
  constructor(private _iterable) {
    this[Symbol.asyncIterator] = this[Symbol.iterator] = _iterable
  }

  all(predicate: (value: T) => boolean | Promise<boolean>) {
    return _allAsync<T>(this, predicate);
  }
  any(predicate: (value: T) => boolean | Promise<boolean>) {
    return _anyAsync<T>(this, predicate);
  }
  count() {
    return _countAsync<T>(this);
  }
  first(predicate?: (value: T) => boolean | Promise<boolean>): Promise<T | undefined> {
    return _firstAsync<T>(this, predicate);
  }
  last(predicate?: (value: T) => boolean | Promise<boolean>): Promise<T | undefined> {
    return _lastAsync<T>(this, predicate);
  }
  orderBy(comparer: (a: T, b: T) => number) {
    return new _LinqAsync<T>(() => _orderByAsync(this, comparer));
  }
  selectMany<R>(selector: (value: T, index: number) => AsyncIterable<R>) {
    return new _LinqAsync<R>(() => _selectManyAsync(this, selector));
  }
  select<R>(selector: (value: T, index: number) => Promise<R>) {
    return new _LinqAsync<R>(() => _selectAsync(this, selector));
  }
  skipWhile(predicate: (value: T) => boolean | Promise<boolean>) {
    return new _LinqAsync<T>(() => _skipWhileAsync(this, predicate));
  }
  skip(count: number) {
    return new _LinqAsync<T>(() => _skipAsync(this, count));
  }
  takeWhile(predicate: (value: T) => boolean | Promise<boolean>) {
    return new _LinqAsync<T>(() => _takeWhileAsync(this, predicate));
  }
  take(count: number) {
    return new _LinqAsync<T>(() => _takeAsync(this, count));
  }
  toArray() {
    return _toArrayAsync<T>(this);
  }
  where(predicate: (value: T, index: number) => boolean | Promise<boolean>) {
    return new _LinqAsync<T>(() => _whereAsync(this, predicate));
  }
}