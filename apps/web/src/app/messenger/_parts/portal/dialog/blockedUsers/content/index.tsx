import { useUserInfo } from "@repo/hooks/useUserInfo";
import { logger } from "@repo/logger";
import type { BaseSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { List } from "@repo/ui/box/list";
import { Typography } from "@repo/ui/typography/typography";

import { ListItem } from "./listItem";

interface Props {}

export const Content: React.FC<Props> = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	const itemClick = (userId: BaseSchema.UserId) => {
		// TODO: Remove
		logger.setLevel("DEBUG");
		logger.log(userId);
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
