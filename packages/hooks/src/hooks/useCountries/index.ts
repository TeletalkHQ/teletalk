import { BaseSchema } from "@repo/schema";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { useGetApi } from "./useGetApi";

export const useCountries = (enabled?: boolean) => {
	const getApi = useGetApi();

	const query = useQuery({
		queryFn() {
			return getApi.handler({});
		},
		queryKey: ["countries"],
		enabled,
	});

	const countries = query.data?.data || getApi.data.data;

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
			countries: sortedCountries,
		},
	};
};
