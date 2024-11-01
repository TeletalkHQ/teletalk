import { useMainApi } from "../../useMainApi";

export const usePostApi = () =>
	useMainApi({
		initialData: {
			data: {},
			errors: [],
		},
		name: "signIn",
	});
