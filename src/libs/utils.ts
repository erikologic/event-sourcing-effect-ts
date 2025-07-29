export type Includes<T, K> = Extract<T, K> extends never ? false : true

export type HasParamWithDiscriminant<
  Params extends Array<any>,
  DiscriminantKey extends keyof any,
  Value extends string
> = Params extends [infer First, ...infer Rest] ? Includes<First, { [K in DiscriminantKey]: Value }> extends true ? true
  : HasParamWithDiscriminant<Rest, DiscriminantKey, Value>
  : false

export type SelectFunctionByDiscriminantValueInParams<
  FuncUnion extends (...args: Array<any>) => any,
  DiscriminantKey extends keyof any,
  Value extends string
> = FuncUnion extends any
  ? FuncUnion extends (...args: infer Params) => any
    ? HasParamWithDiscriminant<Params, DiscriminantKey, Value> extends true ? FuncUnion
    : never
  : never
  : never

export type HasNoNever<T> = { [K in keyof T]: T[K] extends never ? K : never }[keyof T] extends never ? true : false

export type AssertMapShape<
  MapType,
  KeyUnion extends keyof any,
  ValueType
> = MapType extends Record<KeyUnion, ValueType> ? HasNoNever<MapType> extends true ? true
  : ["Error: MapType contains 'never' values"]
  : ["Error: MapType shape is invalid"]

export type Same<A, B> = A extends B ? A :
  B extends A ? B :
  never
