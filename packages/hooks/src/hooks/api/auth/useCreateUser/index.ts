import { usePostApi } from "./usePostApi";

export const useCreateUser = () => {
	const postApi = usePostApi();

	return {
		api: {
			postApi,
		},
	};
};
