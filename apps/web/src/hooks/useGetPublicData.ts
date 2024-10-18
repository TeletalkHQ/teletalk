import type { UserId, UserItem } from "@repo/types";
import { useEffect } from "react";

import { useUserStore } from "~/store";

import { useEmitter } from "./useEmitter";
import { useFindUserById } from "./useFindUserById";

type UseUserPublicData = (userId: UserId) => {
	loading: boolean;
	publicInfo: UserItem;
};

export const useGetPublicData: UseUserPublicData = (userId) => {
	const userStore = useUserStore();
	const { data: publicInfo } = useFindUserById(userId);
	const { handler: getPublicInfo, loading } = useEmitter("getPublicInfo");
	useEffect(() => {
		if (!userId || !userStore.isUserDataSettled) return;

		handler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, userStore.isUserDataSettled]);

	const handler = () => {
		if (userStore.users.some((i) => i.userId === userId)) return;

		getPublicInfo.send({
			userId,
		});
	};

	return {
		loading,
		publicInfo,
		handler,
	};
};
