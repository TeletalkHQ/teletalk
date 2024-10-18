import { randomizer } from "@repo/classes";
import type { Countries } from "@repo/types";

const addUniqueIdToEachCountry = (countries: Countries) => {
	return {
		countries: countries.map((country) => ({
			...country,
			id: randomizer.id(),
		})),
	};
};

export const transformers = {
	addUniqueIdToEachCountry,
};
