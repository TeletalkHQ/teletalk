import { createNewUserRoute } from "@repo/schema";

import { useMainApi } from "../../useMainApi";

export const usePostApi = () =>
	useMainApi({
		initialData: {
			data: {},
			errors: [],
		},
		name: "createNewUser",
		schema: createNewUserRoute.schema,
	});
