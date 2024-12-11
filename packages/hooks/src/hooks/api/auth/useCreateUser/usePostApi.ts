import { createUserRoute } from "@repo/schema";

import { useMainApi } from "../../useMainApi";

export const usePostApi = () =>
	useMainApi({
		initialData: {
			data: {},
			errors: [],
		},
		name: "createUser",
		schema: createUserRoute.schema,
	});
