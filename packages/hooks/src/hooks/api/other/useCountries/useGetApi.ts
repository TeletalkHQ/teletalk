import { getCountriesRoute } from "@repo/schema";

import { useMainApi } from "../../useMainApi";

export const useGetApi = () => {
	return useMainApi({
		initialData: {
			data: {
				countries: [],
			},
			errors: [],
		},
		name: "getCountries",
		schema: getCountriesRoute.schema,
	});
};
