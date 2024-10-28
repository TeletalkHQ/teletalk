import { useCustomRouter } from "../../../utils";
import { RequestHandler } from "../../useApi";
import { usePostApi } from "./usePostApi";

export const useCreateNewUser = () => {
	const router = useCustomRouter();
	const postApi = usePostApi();

	const handler: RequestHandler<typeof postApi.handler> = async ({ data }) => {
		postApi.handler({
			data,
			config: {
				onSuccess: () => {
					router.push("messenger");
				},
			},
		});
	};

	return {
		api: {
			post: {
				...postApi,
				handler,
			},
		},
	};
};
