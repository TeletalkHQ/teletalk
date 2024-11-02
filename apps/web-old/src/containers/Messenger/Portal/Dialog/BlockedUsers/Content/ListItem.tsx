import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { userUtils } from "@repo/classes";
import { UserItem, VoidNoArgs } from "@repo/types";

import { Box, Button } from "~/components";
import { useGetPublicData } from "~/hooks";

interface Props {
	userItem: UserItem;
	onItemLick: VoidNoArgs;
}

const ListItem: React.FC<Props> = ({ userItem, onItemLick }) => {
	const { publicInfo } = useGetPublicData(userItem.userId);

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
					{userUtils.concatFirstNameWithLastName(userItem, publicInfo)}
				</Box.Span>
				<Box.Span>
					{userUtils.concatCountryCodeWithPhoneNumber(
						userItem,
						"unknown phone number"
					)}
				</Box.Span>
			</Box.Span>
			<Box.Span>
				<Button.Icon
					onClick={(e) => {
						e.stopPropagation();
						onItemLick();
					}}
				>
					<LockOpenTwoToneIcon color="error" />
				</Button.Icon>
			</Box.Span>
		</Box.ListItemButton>
	);
};

export default ListItem;
