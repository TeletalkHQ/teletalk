import { z } from "zod";

import { useApi } from "../../useApi";

const output = z.object({
	message: z.string(),
});

const input = z.object({
	device_uuid: z.string().optional(),
	token: z.string(),
});

export const useSendApi = () => {
	return useApi({
		// TODO: Add `baseUrl`
		baseUrl: "",
		endpoint: "user/fcm-token",
		// TODO: `sendFCMToken`
		endpointShortName: "userFcm",
		initialData: {
			data: {
				message: "",
			},
			errors: [],
		},
		method: "put",
		io: {
			input,
			output,
			params: undefined,
			pathnames: undefined,
		},
	});
};
