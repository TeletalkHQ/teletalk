import { userUtils } from "@repo/classes";
import { useUserInfo, useUserPublicInfo } from "@repo/hooks";
import { Flex, Typography } from "@repo/ui";

export const ChatBarCenterContent = () => {
	// const selectedChatId = useChatStore((state) => state.selectedChatId);

	const {
		data: { userInfo },
	} = useUserInfo();

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: userInfo.userId });

	const fullName = userUtils.concatFirstNameWithLastName(userPublicInfo);

	return (
		<Flex ai="center">
			<Typography
				fontWeight="bold"
				style={{
					fontSize: 18,
				}}
			>
				{fullName}
			</Typography>
		</Flex>
	);
};
