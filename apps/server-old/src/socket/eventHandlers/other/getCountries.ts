import { SocketOnHandler } from "@repo/socket";
import { countries } from "@repo/vars";

export const getCountries: SocketOnHandler<"getCountries"> = async () => {
	return { data: { countries } };
};
