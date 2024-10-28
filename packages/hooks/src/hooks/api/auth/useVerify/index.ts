import { domUtils } from "../../../../classes/DomUtils";
import { useCustomRouter } from "../../../utils";
import { RequestHandler } from "../../useApi";
import { usePostApi } from "./usePostApi";

export const useVerify = () => {
	const router = useCustomRouter();
	const postApi = usePostApi();

	const handler: RequestHandler<typeof postApi.handler> = ({ data }) => {
		return postApi.handler({
			data,
			config: {
				onSuccess: ({ data }) => {
					if (data.data.isNewUser) router.replace("create");
					else {
						router.push("messenger");
					}
				},
				onError: () => {
					domUtils()
						.setElementByName("verificationCode")
						.focusElement()
						.selectAllValue();
				},
			},
		});
	};

	return {
		api: {
			post: {
				...postApi,
				handler,
			},
		},
	};
};
