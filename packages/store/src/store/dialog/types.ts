import { type VoidNoArgs } from "@repo/types";

import { type StoreSetFn } from "../../utils";
import type { dialogNames } from "./initialState";

export type DialogName = (typeof dialogNames)[number];

export type DialogProps = {
	zIndex: number;
	shouldKeepOpenCurrentDialog?: boolean;
};

export interface DialogState {
	name: DialogName;
	props: DialogProps;
}

export type OnOpenDialogProps = Omit<DialogProps, "zIndex"> & {
	forceZIndex?: number;
};

export interface DialogTemplateData extends DialogState {
	close: VoidNoArgs;
	isOpen: boolean;
	name: DialogName;
	open: (props?: OnOpenDialogProps) => void;
}

export interface Handlers {
	setCloseAllDialog: VoidNoArgs;
	setDialogClose: VoidNoArgs;
	setOpenDialog: (dialogName: DialogName, props?: OnOpenDialogProps) => void;
}

export interface State {
	dialogStates: DialogState[];
}
export type SetState = StoreSetFn<State>;
export type Store = State & Handlers;
