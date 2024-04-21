import { GetCountriesIO } from "@repo/type-store";
import { countries } from "@repo/vars";

import { SocketOnHandler } from "~/types";

export const getCountries: SocketOnHandler<GetCountriesIO> = async () => {
	return { data: { countries } };
};
