import { RequestHandler } from "../../useApi";
import { usePostApi } from "./usePostApi";

export const useCreateNewUser = () => {
	const postApi = usePostApi();

	const handler: RequestHandler<typeof postApi.handler> = async ({ data }) => {
		postApi.handler({
			data,
		});
	};

	return {
		api: {
			postApi: {
				...postApi,
				handler,
			},
		},
	};
};
