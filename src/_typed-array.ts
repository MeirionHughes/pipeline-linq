export type TypedArray =
  Uint8Array |
  Uint16Array |
  Uint32Array |
  Int8Array |
  Int16Array |
  Int32Array |
  Float32Array |
  Float64Array;

export type TypedArrayConstructor<T extends TypedArray> = {
  new(length: number): T;
}