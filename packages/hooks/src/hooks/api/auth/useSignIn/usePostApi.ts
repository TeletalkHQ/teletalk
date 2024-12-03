import { signInRoute } from "@repo/schema";

import { useMainApi } from "../../useMainApi";

export const usePostApi = () =>
	useMainApi({
		initialData: {
			data: {},
			errors: [],
		},
		name: "signIn",
		schema: signInRoute.schema,
	});
