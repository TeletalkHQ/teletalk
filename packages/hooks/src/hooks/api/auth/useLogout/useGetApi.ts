import { createInitialData, useMainApi } from "../../useMainApi";

export const useGetApi = () => {
	return useMainApi({
		name: "logout",
		initialData: createInitialData("logout", {}),
	});
};
