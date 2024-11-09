import { maker } from "@repo/classes";
import { BaseSchema } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";
import { queryKeys, useMainQuery } from "../useMainQuery";

type Arg = {
	userId: BaseSchema.UserId | undefined;
};

export const useUserPublicInfo = ({ userId }: Arg) => {
	const { emitter, socket } = useMainEmitter({
		name: "getUserPublicInfo",
		initialData,
	});

	const queryKey = queryKeys.getUserPublicInfo({ userId });

	const queryFn = () => {
		if (userId)
			return emitter({
				data: {
					userId,
				},
			});
	};

	const query = useMainQuery({
		queryFn,
		queryKey,
		enabled: !!userId && !!socket,
	});

	return {
		data: {
			userPublicInfo:
				query.data?.data.userPublicInfo || initialData.data.userPublicInfo,
		},
	};
};

const initialData = createEmitterInitialData("getUserPublicInfo", {
	userPublicInfo: maker.emptyUserPublicInfo(),
});
