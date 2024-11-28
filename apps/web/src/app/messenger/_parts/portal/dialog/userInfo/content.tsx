import { useIsOnline, useUserPublicInfo } from "@repo/hooks";
import { Avatar, Div, Flex, Typography } from "@repo/ui";

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
		<Flex ai="center" gap={2}>
			<Div>
				<Avatar
					src={userPublicInfo.avatarSrc}
					style={{
						height: 80,
						width: 80,
					}}
				/>
			</Div>

			<Flex col>
				<Typography
					style={{
						fontSize: 20,
					}}
				>
					{userPublicInfo.firstName} {userPublicInfo.lastName} :{" "}
					{connectionStatus}
				</Typography>

				<Div
					style={{
						fontSize: 14,
					}}
				>
					{/* {userPublicInfo.countryCode} */}
				</Div>
			</Flex>
		</Flex>
	);
};
