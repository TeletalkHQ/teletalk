import type { BaseSchema } from "@repo/schema";

import { useUserInfo } from "./useUserInfo";
import type { UseUserPublicInfoArg } from "./useUserPublicInfo";
import { useUserPublicInfo } from "./useUserPublicInfo";

export const useFullName = ({
	userId,
}: UseUserPublicInfoArg): BaseSchema.FullName => {
	const {
		data: { userInfo },
	} = useUserInfo();

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId });

	const foundContact = userInfo.contacts.find(
		(item) => item.userId === userPublicInfo.userId
	);

	return {
		firstName: foundContact?.firstName || userPublicInfo.firstName,
		lastName: foundContact?.lastName || userPublicInfo.lastName,
	};
};
