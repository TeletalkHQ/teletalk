"use client";

import { useUserInfo, useUserPublicInfo } from "@repo/hooks";

import { MessengerContainer } from "./_parts";

const Messenger = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: userInfo.userId });

	return <MessengerContainer />;
};
export default Messenger;
