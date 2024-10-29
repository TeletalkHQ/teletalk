import { logger } from "@repo/logger";

import { RequestHandler } from "../../useApi";
import { usePostApi } from "./usePostApi";

export const useSignIn = () => {
	const postApi = usePostApi();

	const handler: RequestHandler<typeof postApi.handler> = ({ data }) => {
		return postApi.handler({
			data,
			config: {
				onError: () => {
					logger.error();
				},
			},
		});
	};

	return {
		api: {
			post: postApi,
		},
		handlers: {
			signIn: handler,
		},
	};
};
