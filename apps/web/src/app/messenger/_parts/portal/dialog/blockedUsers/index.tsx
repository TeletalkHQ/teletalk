import type { UserId } from "@repo/types";

import { useDialogState } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";

export const BlockedUsers = () => {
	const globalStore = useGlobalStore();
	const userStore = useUserStore();
	const dialogState = useDialogState("blockedUsers");

	const handleItemClick = (userId: UserId) => {
		userStore.updateSelectedUserIdForActions(userId);
		globalStore.openDialog("removeBlock");
	};

	return (
		<>
			<DialogTemplate
				actions={<Actions onClose={globalStore.closeDialog} />}
				content={<Content onItemLick={handleItemClick} />}
				open={dialogState.open}
			/>
		</>
	);
};
