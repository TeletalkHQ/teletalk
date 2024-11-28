import { useUserPublicInfo } from "@repo/hooks";
import { Div, Span, Typography } from "@repo/ui";

import { useUserStore } from "~/store";

interface Props {}

export const Content: React.FC<Props> = () => {
	const selectedUserIdToBlock = useUserStore((state) => state.userIdToBlock);

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: selectedUserIdToBlock });

	return (
		<>
			<Div style={{ textAlign: "center", fontSize: 18 }}>
				<Span>Are you sure you want to</Span> <Typography>block</Typography>{" "}
				<Typography>
					{userPublicInfo.firstName} {userPublicInfo.lastName}
				</Typography>
				<Span>?</Span>
			</Div>
		</>
	);
};
