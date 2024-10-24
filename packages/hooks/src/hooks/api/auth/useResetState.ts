import { resetAllStores } from "@repo/store";
import { useQueryClient } from "@tanstack/react-query";

export const useResetState = () => {
	const queryClient = useQueryClient();

	const resetState = async () => {
		resetAllStores();

		queryClient.clear();
	};

	return {
		handlers: {
			resetState,
		},
	};
};
