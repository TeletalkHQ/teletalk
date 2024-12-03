import { pingRoute } from "@repo/schema";

import { useMainApi } from "../../useMainApi";

export const usePingApi = () =>
	useMainApi({
		initialData: {
			data: {
				pong: "",
			},
			errors: [],
		},
		name: "ping",
		schema: pingRoute.schema,
	});
