import { useIsOnline, useUserPublicInfo } from "@repo/hooks";
import { Box, Typography } from "@repo/ui";

import { useUserStore } from "~/store";

export const Content: React.FC = () => {
	const userIdToChat = useUserStore((state) => state.userIdToChat);

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: userIdToChat });

	const { isOnline } = useIsOnline({
		userId: userIdToChat,
	});

	const connectionStatus = isOnline ? "online" : "offline";

	return (
		<Box.Flex ai="center" gap={2}>
			<Box.Div>
				<Box.Avatar
					src={userPublicInfo.avatarSrc}
					style={{
						height: 80,
						width: 80,
					}}
				/>
			</Box.Div>

			<Box.Flex col>
				<Typography
					style={{
						fontSize: 20,
					}}
				>
					{userPublicInfo.firstName} {userPublicInfo.lastName} :{" "}
					{connectionStatus}
				</Typography>

				<Box.Div
					style={{
						fontSize: 14,
					}}
				>
					{/* {userPublicInfo.countryCode} */}
				</Box.Div>
			</Box.Flex>
		</Box.Flex>
	);
};
