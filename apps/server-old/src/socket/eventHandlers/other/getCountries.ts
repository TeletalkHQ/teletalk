import { countries } from "@repo/constants";
import { SocketOnHandler } from "@repo/socket";

export const getCountries: SocketOnHandler<"getCountries"> = async () => {
	return { data: { countries } };
};
