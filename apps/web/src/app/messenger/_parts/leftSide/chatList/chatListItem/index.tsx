import { useUserPublicInfo } from "@repo/hooks/useUserPublicInfo";
import { type BaseSchema } from "@repo/schema";
import { type VoidNoArgs } from "@repo/types";
import { Avatar } from "@repo/ui/box/Avatar";
import { Flex } from "@repo/ui/box/flex";
import { ListItemAvatar } from "@repo/ui/box/listItemAvatar";
import { ListItemButton } from "@repo/ui/box/listItemButton";

import { Lower } from "./lower";
import { Upper } from "./upper";

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
			className="h-14 w-full rounded-lg flex justify-between overflow-hidden text-ellipsis text-nowrap"
			selected={selected}
			onClick={onClick}
		>
			<ListItemAvatar>
				<Avatar src={userPublicInfo.avatarSrc} />
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
