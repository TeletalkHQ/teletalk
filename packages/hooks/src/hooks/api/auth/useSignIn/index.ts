import { usePostApi } from "./usePostApi";

export const useSignIn = () => {
	const postApi = usePostApi();

	return {
		api: {
			postApi,
		},
	};
};
