import { useFullName } from "./useFullName";
import type { UseUserPublicInfoArg } from "./useUserPublicInfo";

export const useConcatenatedFullName = ({
	userId,
}: UseUserPublicInfoArg): string => {
	const { firstName, lastName } = useFullName({ userId });

	return `${firstName} ${lastName}`;
};
