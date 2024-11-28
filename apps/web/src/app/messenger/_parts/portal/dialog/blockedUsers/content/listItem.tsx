import { userUtils } from "@repo/classes";
import { useUserPublicInfo } from "@repo/hooks";
import { BaseSchema } from "@repo/schema";
import { VoidNoArgs } from "@repo/types";
import { Box, IconButton, LockOpenTwoToneIcon } from "@repo/ui";

interface Props {
	onItemLick: VoidNoArgs;
	item: BaseSchema.UserPublicInfo;
}

export const ListItem: React.FC<Props> = ({ item, onItemLick }) => {
	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: item.userId });

	return (
		<Box.ListItemButton
			style={{
				alignItems: "center",
				borderRadius: "10px",
				display: "flex",
				gap: 10,
				height: "65px",
				justifyContent: "space-between",
			}}
			onClick={onItemLick}
		>
			<Box.Span>
				<Box.Avatar style={{ width: "50px", height: "50px" }} />
			</Box.Span>
			<Box.Span
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 5,
				}}
			>
				<Box.Span>
					{userUtils.concatFirstNameWithLastName(item, userPublicInfo)}
				</Box.Span>
				<Box.Span>
					{/* {userUtils.concatCountryCodeWithPhoneNumber(
						item,
						"unknown phone number"
					)} */}
				</Box.Span>
			</Box.Span>
			<Box.Span>
				<IconButton
					onClick={(e) => {
						e.stopPropagation();
						onItemLick();
					}}
				>
					<LockOpenTwoToneIcon color="error" />
				</IconButton>
			</Box.Span>
		</Box.ListItemButton>
	);
};
