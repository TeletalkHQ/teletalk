import { ListItemAvatar } from "@mui/material";
import { useUserPublicInfo } from "@repo/hooks";
import { BaseSchema } from "@repo/schema";
import { VoidNoArgs } from "@repo/types";
import { Box } from "@repo/ui";

import { Lower } from "./Lower";
import { Upper } from "./Upper";

interface Props {
	messageText: BaseSchema.MessageText;
	onClick: VoidNoArgs;
	selected: boolean;
	senderId: BaseSchema.UserId;
}

export const ChatListItem: React.FC<Props> = ({
	messageText,
	onClick,
	selected,
	senderId,
}) => {
	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: senderId });

	return (
		<Box.ListItemButton
			selected={selected}
			style={{
				borderRadius: "10px",
				display: "flex",
				height: "65px",
				justifyContent: "space-between",
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			}}
			onClick={onClick}
		>
			<ListItemAvatar>
				<Box.Avatar
					// TODO: Add `avatar`
					// src={userPublicInfo.avatarSrc}
					style={{ width: 45, height: 45 }}
				/>
			</ListItemAvatar>

			<Box.Flex col style={{ width: "80%" }}>
				<Upper
					firstName={userPublicInfo.firstName}
					lastName={userPublicInfo.lastName}
				/>
				<Lower messageText={messageText} />
			</Box.Flex>
		</Box.ListItemButton>
	);
};
