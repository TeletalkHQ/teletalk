import { useMainApi } from "../../useMainApi";

export const usePostApi = () =>
	useMainApi({
		initialData: {
			data: {
				isNewUser: false,
			},
			errors: [],
		},
		name: "verify",
	});
