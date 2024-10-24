import { baseSchema } from "@repo/schema";
import { z } from "zod";

import { useApi } from "../api";

const output = z.object({
	code: z.number(),
	msg: z.string(),
	data: baseSchema.countries,
});

export const useGetApi = () => {
	return useApi({
		endpoint: "v4/countries",
		endpointShortName: "getCountries",
		initialData: {
			code: 200,
			data: [],
			msg: "",
		},
		io: {
			input: undefined,
			output,
			params: undefined,
			pathnames: undefined,
		},
	});
};
