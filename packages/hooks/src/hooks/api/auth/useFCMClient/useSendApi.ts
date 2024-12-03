import { userFcmRoute } from "@repo/schema";

import { useMainApi } from "../../useMainApi";

export const useSendApi = () => {
	return useMainApi({
		name: "userFcm",
		// TODO: Extract initial data - use `createInitialData`
		initialData: {
			data: {
				message: "",
			},
			errors: [],
		},
		schema: userFcmRoute.schema,
	});
};
