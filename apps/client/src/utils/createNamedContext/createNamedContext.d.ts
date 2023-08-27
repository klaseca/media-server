type Params<Value, Name extends string, NullishAllowed extends boolean> = {
  name: Name;
  initialValue: Value;
  isNullishAllowed?: NullishAllowed;
};

type ValueType<
  Value,
  NullishAllowed extends boolean = false
> = NullishAllowed extends true ? Value : NonNullable<Value>;

type ContextValues<V, T extends string, N extends boolean> = {
  context: { name: `${T}Context`; value: React.Context<ValueType<V, N>> };
  provider: { name: `${T}Provider`; value: React.Provider<ValueType<V, N>> };
  consumer: { name: `${T}Consumer`; value: React.Consumer<ValueType<V, N>> };
  use: { name: `use${T}`; value: () => ValueType<V, N> };
};

type NamedContext<
  Value,
  Name extends string,
  NullishAllowed extends boolean
> = {
  [Key in keyof ContextValues<Value, Name, NullishAllowed> as ContextValues<
    Value,
    Name,
    NullishAllowed
  >[Key]['name']]: ContextValues<Value, Name, NullishAllowed>[Key]['value'];
};

export const createNamedContext: <
  Value,
  Name extends string,
  NullishAllowed extends boolean = false
>({
  name,
  initialValue,
  isNullishAllowed,
}: Params<Value, Name, NullishAllowed>) => NamedContext<
  Value,
  Name,
  NullishAllowed
>;
