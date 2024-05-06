import { SocketOnHandler } from "@repo/hl-types";
import { countries } from "@repo/vars";

export const getCountries: SocketOnHandler<"getCountries"> = async () => {
	return { data: { countries } };
};
