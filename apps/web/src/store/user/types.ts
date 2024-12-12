import { type StoreSetFn } from "@repo/store";

type _SelectedUUID = string | undefined;

export interface State {
	selectedUUID: {
		to: {
			block: _SelectedUUID;
			chat: _SelectedUUID;
			editContact: _SelectedUUID;
			removeContact: _SelectedUUID;
			unblock: _SelectedUUID;
		};
	};
}

export interface Handlers {
	setSelectedUUID: (
		to: keyof State["selectedUUID"]["to"],
		value: _SelectedUUID
	) => void;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
