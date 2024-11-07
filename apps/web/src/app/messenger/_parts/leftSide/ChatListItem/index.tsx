import { useUserPublicInfo } from "@repo/hooks";
import { BaseSchema } from "@repo/schema";
import { VoidNoArgs } from "@repo/types";

import Lower from "./Lower";
import Upper from "./Upper";

interface Props {
	messageText: BaseSchema.MessageText;
	onClick: VoidNoArgs;
	selected: boolean;
	userId: BaseSchema.UserId;
}

const ChatListItem: React.FC<Props> = ({
	messageText,
	onClick,
	selected,
	userId,
}) => {
	const { publicInfo } = useUserPublicInfo({ userId });

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
