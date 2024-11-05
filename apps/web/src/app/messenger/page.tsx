"use client";

import { useUserInfo, useUserPublicInfo } from "@repo/hooks";

const Messenger = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: userInfo.userId });

	return <div>hello</div>;
};

export default Messenger;
