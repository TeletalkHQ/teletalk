import { useUserPublicInfo } from "@repo/hooks";
import { Box, Typography } from "@repo/ui";

import { useUserStore } from "~/store";

interface Props {}

export const Content: React.FC<Props> = () => {
	const selectedUserIdToBlock = useUserStore((state) => state.userIdToBlock);

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: selectedUserIdToBlock });

	return (
		<>
			<Box.Div style={{ textAlign: "center", fontSize: 18 }}>
				<Box.Span>Are you sure you want to</Box.Span>{" "}
				<Typography>block</Typography>{" "}
				<Typography>
					{userPublicInfo.firstName} {userPublicInfo.lastName}
				</Typography>
				<Box.Span>?</Box.Span>
			</Box.Div>
		</>
	);
};
