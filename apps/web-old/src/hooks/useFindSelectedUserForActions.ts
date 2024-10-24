import { emptyMaker } from "@repo/classes";

import { useUserStore } from "~/store";

export const useFindSelectedUserForActions = () => {
	const userStore = useUserStore();

	return (
		userStore.users.find(
			(item) => item.userId === userStore.selectedUserIdForActions
		) || emptyMaker.emptyUser()
	);
};
