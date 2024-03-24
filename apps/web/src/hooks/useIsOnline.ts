import type { UserId } from "@repo/type-store";

import { useUserStore } from "~/store";

export const useIsOnline = (userId: UserId) => {
	const userStore = useUserStore();

	return {
		isOnline: !!userStore.onlineUsers.find((i) => i.userId === userId)
			?.isOnline,
	};
};
