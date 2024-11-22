import { useUserPublicInfo } from "@repo/hooks";
import { Box, Typography } from "@repo/ui";

import { useUserStore } from "~/store";

export const Content: React.FC = () => {
	const userIdForRemoveContact = useUserStore(
		(state) => state.userIdForRemoveContact
	);

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: userIdForRemoveContact });

	return (
		<Box.Div style={{ textAlign: "center", fontSize: 18 }}>
			<Box.Span>Are you sure you want to</Box.Span>{" "}
			<Typography>remove</Typography> <Box.Span>user</Box.Span>{" "}
			<Typography>
				{userPublicInfo.firstName} {userPublicInfo.lastName}
			</Typography>
			<Box.Span>from your contacts?</Box.Span>
		</Box.Div>
	);
};
