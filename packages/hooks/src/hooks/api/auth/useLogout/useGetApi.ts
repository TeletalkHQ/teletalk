import { createRequestInitialData, useMainApi } from "../../useMainApi";

export const useGetApi = () => {
	return useMainApi({
		name: "logout",
		initialData: createRequestInitialData("logout", {}),
	});
};
