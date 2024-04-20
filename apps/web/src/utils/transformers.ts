import type { Countries } from "@repo/type-store";
import { randomMaker } from "@repo/utility-store";

const addUniqueIdToEachCountry = (countries: Countries) => {
	return {
		countries: countries.map((country) => ({
			...country,
			id: randomMaker.id(),
		})),
	};
};

export const transformers = {
	addUniqueIdToEachCountry,
};
