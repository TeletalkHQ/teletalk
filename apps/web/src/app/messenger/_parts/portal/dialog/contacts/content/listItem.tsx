import { useUserPublicInfo } from "@repo/hooks";
import { BaseSchema } from "@repo/schema";
import { VoidNoArgs } from "@repo/types";
import { Box, Typography } from "@repo/ui";

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
		<Box.ListItemButton
			style={{
				borderRadius: "10px",
				display: "flex",
				gap: 10,
				height: "65px",
			}}
			onClick={onContactClick}
			onContextMenu={onContextMenu}
		>
			<Box.Div>
				<Box.Avatar src={avatarSrc} />
			</Box.Div>

			<Box.Div style={{ width: "100%" }}>
				<Box.Flex ai="center" jc="space-between">
					<Typography style={{ fontSize: 18 }}>{fullName}</Typography>
					{/* <Box.Div>time</Box.Div> */}
				</Box.Flex>

				<Box.Flex ai="center" jc="space-between">
					<Box.Div>{lastSeen}</Box.Div>
					{/* <Box.Div>icons</Box.Div> */}
				</Box.Flex>
			</Box.Div>
		</Box.ListItemButton>
	);
};
