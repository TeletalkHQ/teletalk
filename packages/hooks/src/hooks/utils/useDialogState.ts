import type { DialogStore } from "@repo/store";
import { defaultDialogProps, useDialogStore } from "@repo/store";

// TODO: Refactor
export const useDialogState = <T extends DialogStore.DialogName>(
	dialogName: T
) => {
	const dialogStore = useDialogStore();

	const open: DialogStore.DialogTemplateData["open"] = (props) => {
		dialogStore.setOpenDialog(dialogName, props);
	};

	const close = () => {
		dialogStore.setDialogClose();
	};

	let dialogData: DialogStore.DialogTemplateData = {
		close,
		isOpen: false,
		name: dialogName,
		open,
		props: {
			...defaultDialogProps,
			shouldKeepOpenCurrentDialog: false,
		},
	};

	const makeDialogOpen = (): DialogStore.DialogTemplateData => {
		const currentDialogState = reversedDialogStates.at(indexOfCurrentDialog);

		return {
			...dialogData,
			...currentDialogState,
			isOpen: true,
			props: {
				...dialogData.props,
				...currentDialogState?.props,
			},
		};
	};

	const reversedDialogStates = [...dialogStore.dialogStates].reverse();

	const indexOfCurrentDialog = reversedDialogStates.findIndex(
		(item) => item.name === dialogName
	);

	const indexBeforeCurrentDialog = indexOfCurrentDialog - 1;

	const dialogStateBeforeCurrent =
		reversedDialogStates[indexBeforeCurrentDialog];

	if (
		dialogStateBeforeCurrent?.props.shouldKeepOpenCurrentDialog ||
		indexOfCurrentDialog === 0
	) {
		dialogData = makeDialogOpen();
	}

	return dialogData;
};
