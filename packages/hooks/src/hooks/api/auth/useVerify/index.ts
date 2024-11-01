import { usePostApi } from "./usePostApi";

export const useVerify = () => {
	const postApi = usePostApi();

	return {
		api: {
			postApi,
		},
	};
};
