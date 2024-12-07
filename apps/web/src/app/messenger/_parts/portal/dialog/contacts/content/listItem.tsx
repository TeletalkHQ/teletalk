import { useUserPublicInfo } from "@repo/hooks";
import { BaseSchema } from "@repo/schema";
import { VoidNoArgs } from "@repo/types";
import { Avatar } from "@repo/ui/box/Avatar";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { ListItemButton } from "@repo/ui/box/listItemButton";
import { Typography } from "@repo/ui/typography/typography";

import { GlobalStore } from "~/store";

interface Props {
	fullName: string;
	//REFACTOR: To template string
	lastSeen: string;
	onContactClick: VoidNoArgs;
	onContextMenu: GlobalStore.OnContextMenu;
	userId: BaseSchema.UserId;
}

export const ListItem: React.FC<Props> = ({
	fullName,
	lastSeen,
	onContactClick,
	onContextMenu,
	userId,
}) => {
	const {
		data: {
			userPublicInfo: { avatarSrc },
		},
	} = useUserPublicInfo({ userId });

	return (
		<ListItemButton
			style={{
				borderRadius: "10px",
				display: "flex",
				gap: 10,
				height: "65px",
			}}
			onClick={onContactClick}
			onContextMenu={onContextMenu}
		>
			<Div>
				<Avatar src={avatarSrc} />
			</Div>

			<Div style={{ width: "100%" }}>
				<Flex ai="center" jc="space-between">
					<Typography style={{ fontSize: 18 }}>{fullName}</Typography>
					{/* <Div>time</Div> */}
				</Flex>

				<Flex ai="center" jc="space-between">
					<Div>{lastSeen}</Div>
					{/* <Div>icons</Div> */}
				</Flex>
			</Div>
		</ListItemButton>
	);
};
