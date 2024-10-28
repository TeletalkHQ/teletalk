import { logger } from "@repo/logger";

import { useCustomRouter } from "../../../utils";
import { RequestHandler } from "../../useApi";
import { usePostApi } from "./usePostApi";

export const useSignIn = () => {
	const router = useCustomRouter();
	const postApi = usePostApi();

	const handler: RequestHandler<typeof postApi.handler> = ({ data }) => {
		return postApi.handler({
			data,
			config: {
				onSuccess: () => {
					router.push("verify");
				},
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
