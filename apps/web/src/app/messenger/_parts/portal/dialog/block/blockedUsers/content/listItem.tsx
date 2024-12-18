import { useUserPublicInfo } from "@repo/hooks/useUserPublicInfo";
import { type BaseSchema } from "@repo/schema";
import { type VoidNoArgs } from "@repo/types";
import { Avatar } from "@repo/ui/box/Avatar";
import { Div } from "@repo/ui/box/div";
import { Grid } from "@repo/ui/box/grid";
import { ListItemAvatar } from "@repo/ui/box/listItemAvatar";
import { ListItemButton } from "@repo/ui/box/listItemButton";
import { Button } from "@repo/ui/button/button";
import { Typography } from "@repo/ui/typography/typography";

interface Props {
	onItemLick: VoidNoArgs;
	userId: BaseSchema.UserId;
}

export const ListItem: React.FC<Props> = ({ userId, onItemLick }) => {
	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId });

	return (
		<Grid container spacing={1}>
			<Grid item xs={8}>
				<ListItemButton
					className="flex flex-row w-full rounded-lg items-center justify-between"
					onClick={onItemLick}
				>
					<ListItemAvatar>
						<Avatar />
					</ListItemAvatar>

					<Div className="flex flex-col w-full justify-between items-start">
						<Typography variant="body1">
							{userPublicInfo.firstName} {userPublicInfo.lastName}
						</Typography>

						<Typography variant="subtitle2">
							Unknown phone number
							{/* {userUtils.concatCountryCodeWithPhoneNumber(
						item,
						"unknown phone number"
					)} */}
						</Typography>
					</Div>
				</ListItemButton>
			</Grid>

			<Grid item xs={4}>
				<Button
					className="w-full h-full rounded-lg"
					variant="text"
					onClick={onItemLick}
				>
					Unblock
				</Button>
			</Grid>
		</Grid>
	);
};
