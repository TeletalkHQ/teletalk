import { GlobalStore, useGlobalStore } from "~/store";

export const useDialogState = (
	dialogName: GlobalStore.DialogName
): {
	open: boolean;
	props: GlobalStore.DialogProps;
} => {
	const globalStore = useGlobalStore();

	const ds = globalStore.dialogStates.at(-1);

	return ds?.name === dialogName
		? {
				...ds,
				open: true,
			}
		: {
				open: false,
				props: {
					zIndex: 1300,
				},
			};
};
