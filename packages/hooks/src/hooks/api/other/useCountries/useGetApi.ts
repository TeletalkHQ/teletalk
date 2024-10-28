import { findHttpRoute } from "@repo/schema";

import { useApi } from "../../useApi";

const route = findHttpRoute("getCountries");

export const useGetApi = () => {
	return useApi({
		endpoint: route.schema.pathname,
		endpointShortName: "getCountries",
		initialData: {
			countries: [],
		},
		io: {
			input: route.schema.io.input,
			output: route.schema.io.output,
			params: undefined,
			pathnames: undefined,
		},
	});
};
