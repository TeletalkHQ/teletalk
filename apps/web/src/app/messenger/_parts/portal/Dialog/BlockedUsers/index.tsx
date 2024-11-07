import type { UserId } from "@repo/types";

import { Template } from "~/components";
import { useDialogState } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";

const BlockedUsers = () => {
	const globalStore = useGlobalStore();
	const userStore = useUserStore();
	const dialogState = useDialogState("blockedUsers");

	const handleItemClick = (userId: UserId) => {
		userStore.updateSelectedUserIdForActions(userId);
		globalStore.openDialog("removeBlock");
	};

	return (
		<>
			<Template.Dialog
				actions={<Actions onClose={globalStore.closeDialog} />}
				content={<Content onItemLick={handleItemClick} />}
				open={dialogState.open}
			/>
		</>
	);
};

export default BlockedUsers;
