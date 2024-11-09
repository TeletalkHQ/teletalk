import { useUserPublicInfo } from "@repo/hooks";
import { Box, Typography } from "@repo/ui";

import { useUserStore } from "~/store";

interface Props {}

export const Content: React.FC<Props> = () => {
	const selectedUserIdToUnblock = useUserStore(
		(state) => state.selectedUserIdToBlock
	);

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: selectedUserIdToUnblock });

	return (
		<>
			<Box.Div style={{ textAlign: "center", fontSize: 18 }}>
				<Box.Span>Are you sure you want to</Box.Span>{" "}
				<Typography>remove</Typography>{" "}
				<Typography>
					{userPublicInfo.firstName} {userPublicInfo.lastName}{" "}
				</Typography>
				<Box.Span>from your blacklist?</Box.Span>
			</Box.Div>
		</>
	);
};
