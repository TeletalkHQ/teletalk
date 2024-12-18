import { useDialogState } from "@repo/hooks/useDialogState";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import type { BaseSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { List } from "@repo/ui/box/list";
import { Typography } from "@repo/ui/typography/typography";

import { useUserStore } from "~/store";

import { ListItem } from "./listItem";

interface Props {}

export const Content: React.FC<Props> = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	const setSelectedUUID = useUserStore((state) => state.setSelectedUUID);

	const unblockUserDialog = useDialogState("removeBlock");

	const itemClick = (userId: BaseSchema.UserId) => {
		setSelectedUUID("unblock", userId);
		unblockUserDialog.open();
	};

	return (
		<List className="flex flex-col gap-2">
			{userInfo.blacklist.length === 0 && (
				<Div className="text-center">
					<Typography variant="body1">No blocked users</Typography>
					<Typography variant="body2">
						You haven&apos;t blocked anyone yet.
					</Typography>
				</Div>
			)}
			{userInfo.blacklist.map((item, index) => (
				<ListItem
					key={index}
					userId={item.userId}
					onItemLick={() => itemClick(item.userId)}
				/>
			))}
		</List>
	);
};
