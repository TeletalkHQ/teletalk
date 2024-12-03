import { logoutRoute } from "@repo/schema";

import { createInitialData, useMainApi } from "../../useMainApi";

export const useGetApi = () => {
	return useMainApi({
		name: "logout",
		initialData: createInitialData(logoutRoute.schema, {}),
		schema: logoutRoute.schema,
	});
};
