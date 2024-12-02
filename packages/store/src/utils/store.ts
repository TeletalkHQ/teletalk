import { StateCreator, create as _create } from "zustand";

const resetters: (() => void)[] = [];

export const createStore = (<T extends unknown>(
	f: StateCreator<T> | undefined
) => {
	if (f === undefined) return createStore;
	const store = _create(f);
	const initialState = store.getInitialState();
	resetters.push(() => {
		store.setState(initialState, true);
	});
	return store;
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
	replace?: false | undefined
) => void;
