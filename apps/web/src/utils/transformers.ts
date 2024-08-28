import { randomMaker } from "@repo/classes";
import type { Countries } from "@repo/types";

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
