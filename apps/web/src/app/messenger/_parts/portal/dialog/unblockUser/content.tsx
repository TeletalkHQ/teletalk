import { useUserPublicInfo } from "@repo/hooks";
import { Div, Span, Typography } from "@repo/ui";

import { useUserStore } from "~/store";

interface Props {}

export const Content: React.FC<Props> = () => {
	const selectedUserIdToUnblock = useUserStore((state) => state.userIdToBlock);

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: selectedUserIdToUnblock });

	return (
		<>
			<Div style={{ textAlign: "center", fontSize: 18 }}>
				<Span>Are you sure you want to</Span> <Typography>remove</Typography>{" "}
				<Typography>
					{userPublicInfo.firstName} {userPublicInfo.lastName}{" "}
				</Typography>
				<Span>from your blacklist?</Span>
			</Div>
		</>
	);
};
