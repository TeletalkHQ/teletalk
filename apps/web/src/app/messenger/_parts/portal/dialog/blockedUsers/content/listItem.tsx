import { userUtils } from "@repo/classes";
import { useUserPublicInfo } from "@repo/hooks/useUserPublicInfo";
import { type BaseSchema } from "@repo/schema";
import { type VoidNoArgs } from "@repo/types";
import { Avatar } from "@repo/ui/box/Avatar";
import { ListItemButton } from "@repo/ui/box/listItemButton";
import { Span } from "@repo/ui/box/span";
import { IconButton } from "@repo/ui/button/icon";
import { AccountBoxIcon } from "@repo/ui/icons/accountBox";

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
					<AccountBoxIcon color="error" />
				</IconButton>
			</Span>
		</ListItemButton>
	);
};
