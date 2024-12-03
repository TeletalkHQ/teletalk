import { maker } from "@repo/classes";
import { getUserInfoEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";
import { queryKeys, useMainQuery } from "../useMainQuery";

export const useUserInfo = () => {
	const { emitter, socket } = useMainEmitter({
		name: "getUserInfo",
		initialData,
		schema: getUserInfoEvent.schema,
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

	return {
		data: {
			userInfo: query.data?.data.userInfo || initialData.data.userInfo,
		},
	};
};

const initialData = createEmitterInitialData(getUserInfoEvent.schema, {
	userInfo: maker.emptyUserInfo(),
});
