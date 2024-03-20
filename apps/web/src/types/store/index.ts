export type StoreSetFn<StoreType> = (
  partial:
    | StoreType
    | Partial<StoreType>
    | ((state: StoreType) => StoreType | Partial<StoreType>),
  replace?: boolean | undefined
) => void;

export * from "./auth";
export * from "./global";
export * from "./message";
export * from "./settings";
export * from "./user";
