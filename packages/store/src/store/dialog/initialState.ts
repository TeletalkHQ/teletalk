import { DialogState, State } from "./types";

export const dialogNames = [] as const;

export const defaultDialogProps: DialogState["props"] = {
	zIndex: 1300,
	shouldKeepOpenCurrentDialog: false,
};
export const initialState: State = {
	// TODO: Convert to record
	dialogStates: [],
};
