import { defaultDialogProps } from "./initialState";
import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setCloseAllDialog() {
		set(() => ({
			dialogStates: [],
		}));
	},
	setDialogClose() {
		set((prevState) => {
			const newDialogStates = [...prevState.dialogStates];
			newDialogStates.pop();
			return {
				dialogStates: newDialogStates,
			};
		});
	},
	setOpenDialog(dialogName, props) {
		set((prevState) => {
			const newDialogState = {
				name: dialogName,
				props: {
					...defaultDialogProps,
					...props,
				},
			};

			const lastItem = prevState.dialogStates.at(-1);

			if (
				lastItem &&
				newDialogState.props.shouldKeepOpenCurrentDialog &&
				!newDialogState.props.forceZIndex
			) {
				newDialogState.props.zIndex = newDialogState.props.zIndex + 10;
			}

			return {
				dialogStates: [...prevState.dialogStates, newDialogState],
			};
		});
	},
});
