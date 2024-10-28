import { BaseSchema } from "@repo/schema";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { useGetApi } from "./useGetApi";

export const useCountries = (enabled?: boolean) => {
	const getApi = useGetApi();

	const query = useQuery({
		queryFn() {
			return getApi.handler({ data: {} });
		},
		queryKey: ["countries"],
		enabled,
	});

	const countries = query.data?.data.countries || getApi.data.data.countries;

	const sortedCountries: BaseSchema.Countries = useMemo(() => {
		return countries.sort((a, b) => {
			if (a.countryName < b.countryName) {
				return -1;
			}
			if (a.countryName > b.countryName) {
				return 1;
			}
			return 0;
		});
	}, [countries]);

	return {
		data: {
			countries,
			sortedCountries,
		},
	};
};
