import { useUserPublicInfo } from "@repo/hooks/useUserPublicInfo";
import { Div } from "@repo/ui/box/div";
import { Span } from "@repo/ui/box/span";
import { Typography } from "@repo/ui/typography/typography";

import { useUserStore } from "~/store";

export const Content: React.FC = () => {
	const userIdForRemoveContact = useUserStore(
		(state) => state.userIdForRemoveContact
	);

	const {
		data: { userPublicInfo },
	} = useUserPublicInfo({ userId: userIdForRemoveContact });

	return (
		<Div style={{ textAlign: "center", fontSize: 18 }}>
			<Span>Are you sure you want to</Span> <Typography>remove</Typography>{" "}
			<Span>user</Span>{" "}
			<Typography>
				{userPublicInfo.firstName} {userPublicInfo.lastName}
			</Typography>
			<Span>from your contacts?</Span>
		</Div>
	);
};
