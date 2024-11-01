//TODO: Move to components
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { userUtils } from "@repo/classes";
import type { MessageText, UserId } from "@repo/types";
import { VoidNoArgsFn } from "@repo/types";

import { Box } from "~/components";
import { useGetAvatar, useGetPublicData } from "~/hooks";

import Lower from "./Lower";
import Upper from "./Upper";

interface Props {
	messageText: MessageText;
	onClick: VoidNoArgsFn;
	selected: boolean;
	userId: UserId;
}

const ChatListItem: React.FC<Props> = ({
	messageText,
	onClick,
	selected,
	userId,
}) => {
	const { publicInfo } = useGetPublicData(userId);
	const { avatarSrc } = useGetAvatar(userId);

	const fullName = userUtils.concatFirstNameWithLastName(publicInfo);

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
				<Box.Avatar src={avatarSrc} style={{ width: 45, height: 45 }} />
			</ListItemAvatar>

			<Box.Flex col style={{ width: "80%" }}>
				<Upper fullName={fullName} />
				<Lower messageText={messageText} />
			</Box.Flex>
		</Box.ListItemButton>
	);
};

export default ChatListItem;