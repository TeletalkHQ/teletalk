import { findHttpRoute } from "@repo/schema";

import { useApi } from "../../useApi";

const route = findHttpRoute("verify");

export const usePostApi = () =>
	useApi({
		endpoint: route.schema.pathname,
		endpointShortName: route.schema.ioName,
		initialData: {
			data: {
				isNewUser: false,
			},
			errors: [],
		},
		io: {
			input: route.schema.io.input,
			output: route.schema.io.output,
			params: route.schema.params,
			pathnames: route.schema.pathnames,
		},
	});
