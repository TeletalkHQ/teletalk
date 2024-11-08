"use client";

import { useUserInfo, useUserPublicInfo } from "@repo/hooks";

import { MessengerContainer } from "./_parts";

export const Messenger = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: userInfo.userId });

	return <MessengerContainer />;
};
