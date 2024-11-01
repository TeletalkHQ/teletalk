import { usePostApi } from "./usePostApi";

export const useCreateNewUser = () => {
	const postApi = usePostApi();

	return {
		api: {
			postApi,
		},
	};
};
