import { StateCreator, create as _create } from "zustand";

const resetters: (() => void)[] = [];

export const createStore = (<T extends unknown>(
	f: StateCreator<T> | undefined
) => {
	if (f === undefined) return createStore;
	const store = _create(f);
	const initialState = store.getState();
	resetters.push(() => {
		store.setState(initialState, true);
	});
	return store;
	// TODO: Remove `assertion`
}) as typeof _create;

export const resetAllStores = () => {
	for (const resetter of resetters) {
		resetter();
	}
};

export type StoreSetFn<StoreType> = (
	partial:
		| StoreType
		| Partial<StoreType>
		| ((state: StoreType) => StoreType | Partial<StoreType>),
	replace?: boolean | undefined
) => void;
