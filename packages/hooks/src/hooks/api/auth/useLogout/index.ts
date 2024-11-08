import { useGetApi } from "./useGetApi";

export const useLogout = () => {
	const getApi = useGetApi();

	return {
		api: {
			getApi,
		},
	};
};
