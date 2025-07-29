export type HasParamWithDiscriminant<
  Params extends Array<any>,
  DiscriminantKey extends keyof any,
  Value extends string
> = Params extends [infer First, ...infer Rest] ? First extends { [K in DiscriminantKey]: Value } ? true
  : HasParamWithDiscriminant<Rest, DiscriminantKey, Value>
  : false

export type SelectFunctionByDiscriminantValueInParams<
  FuncUnion extends (...args: Array<any>) => any,
  DiscriminantKey extends keyof any,
  Value extends string
> = FuncUnion extends (...args: infer Params) => any
  ? HasParamWithDiscriminant<Params, DiscriminantKey, Value> extends true ? FuncUnion
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
