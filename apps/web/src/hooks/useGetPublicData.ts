import type { UserId, UserItem } from "@repo/type-store";
import { useEffect } from "react";

import { useUserStore } from "~/store";

import { useEmitter } from "./useEmitter";
import { useFindUserById } from "./useFindUserById";

type UseUserPublicData = (userId: UserId) => {
	loading: boolean;
	publicData: UserItem;
};

export const useGetPublicData: UseUserPublicData = (userId) => {
	const userStore = useUserStore();
	const { data: publicData } = useFindUserById(userId);
	const { handler: getPublicData, loading } = useEmitter("getPublicData");
	useEffect(() => {
		if (!userId || !userStore.isUserDataSettled) return;

		handler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, userStore.isUserDataSettled]);

	const handler = () => {
		if (userStore.users.some((i) => i.userId === userId)) return;

		getPublicData.emitFull({
			userId,
		});
	};

	return {
		loading,
		publicData,
		handler,
	};
};
