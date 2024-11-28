import { userUtils } from "@repo/classes";
import { useUserPublicInfo } from "@repo/hooks";
import { BaseSchema } from "@repo/schema";
import { VoidNoArgs } from "@repo/types";
import {
	Avatar,
	IconButton,
	ListItemButton,
	LockOpenTwoToneIcon,
	Span,
} from "@repo/ui";

interface Props {
	onItemLick: VoidNoArgs;
	item: BaseSchema.UserPublicInfo;
}

export const ListItem: React.FC<Props> = ({ item, onItemLick }) => {
	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: item.userId });

	return (
		<ListItemButton
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
			<Span>
				<Avatar style={{ width: "50px", height: "50px" }} />
			</Span>
			<Span
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 5,
				}}
			>
				<Span>
					{userUtils.concatFirstNameWithLastName(item, userPublicInfo)}
				</Span>
				<Span>
					{/* {userUtils.concatCountryCodeWithPhoneNumber(
						item,
						"unknown phone number"
					)} */}
				</Span>
			</Span>
			<Span>
				<IconButton
					onClick={(e) => {
						e.stopPropagation();
						onItemLick();
					}}
				>
					<LockOpenTwoToneIcon color="error" />
				</IconButton>
			</Span>
		</ListItemButton>
	);
};
