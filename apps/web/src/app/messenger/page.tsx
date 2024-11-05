"use client";

import { useEffect } from "react";

import { useMainEmitter } from "~/hooks";

const Messenger = () => {
	const getUserInfo = useMainEmitter({ name: "getUserInfo" });
	const getUserPublicInfo = useMainEmitter({ name: "getUserPublicInfo" });

	useEffect(() => {
		const fn = async () => {
			const response = await getUserInfo.emitter({
				data: {},
			});
			if (response.data) {
				const res2 = await getUserPublicInfo.emitter({
					data: {
						userId: response.data.userInfo.userId,
					},
				});
			}
		};
		fn();
	}, [getUserInfo, getUserPublicInfo]);

	return <div>hello</div>;
};

export default Messenger;
