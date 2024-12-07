import { useUserPublicInfo } from "@repo/hooks/useUserPublicInfo";
import { BaseSchema } from "@repo/schema";
import { VoidNoArgs } from "@repo/types";
import { Avatar } from "@repo/ui/box/Avatar";
import { Flex } from "@repo/ui/box/flex";
import { ListItemAvatar } from "@repo/ui/box/listItemAvatar";
import { ListItemButton } from "@repo/ui/box/listItemButton";

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
		<ListItemButton
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
				<Avatar
					// TODO: Add `avatar`
					// src={userPublicInfo.avatarSrc}
					style={{ width: 45, height: 45 }}
				/>
			</ListItemAvatar>

			<Flex col style={{ width: "80%" }}>
				<Upper
					firstName={userPublicInfo.firstName}
					lastName={userPublicInfo.lastName}
				/>
				<Lower messageText={messageText} />
			</Flex>
		</ListItemButton>
	);
};
