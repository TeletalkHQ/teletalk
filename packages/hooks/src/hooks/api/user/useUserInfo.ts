import { maker } from "@repo/classes";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";
import { queryKeys, useMainQuery } from "../useMainQuery";

export const useUserInfo = () => {
	const { emitter, socket } = useMainEmitter({
		name: "getUserInfo",
		initialData,
	});

	const queryKey = queryKeys.getUserInfo;

	const queryFn = async () => {
		return emitter({
			data: {},
		});
	};

	const query = useMainQuery({
		queryKey,
		queryFn,
		enabled: !!socket,
	});

	console.log("query.data:", query.data);

	return {
		data: {
			userInfo: query.data?.data.userInfo || initialData.data.userInfo,
		},
	};
};

const initialData = createEmitterInitialData("getUserInfo", {
	userInfo: maker.emptyUserInfo(),
});
