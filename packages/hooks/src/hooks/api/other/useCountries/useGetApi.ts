import { findHttpRoute } from "@repo/schema";

import { useApi } from "../../useApi";

const route = findHttpRoute("getCountries");

export const useGetApi = () => {
	return useApi({
		endpoint: `${route.schema.rootPath}/${route.schema.pathname}`,
		endpointShortName: "getCountries",
		initialData: {
			data: {
				countries: [],
			},
			errors: [],
		},
		io: {
			input: route.schema.io.input,
			output: route.schema.io.output,
			params: undefined,
			pathnames: undefined,
		},
	});
};
