import { useConcatenatedFullName } from "@repo/hooks/useConcatenatedFullName";
import { Div } from "@repo/ui/box/div";
import { Typography } from "@repo/ui/typography/typography";

import { useUserStore } from "~/store";

interface Props {}

export const Content: React.FC<Props> = () => {
	const selectedUserIdToUnblock = useUserStore(
		(state) => state.selectedUUID.to.unblock
	);

	const fullName = useConcatenatedFullName({ userId: selectedUserIdToUnblock });

	return (
		<Div>
			<Typography>
				Are you sure you want to
				<Typography color="warning" component="span">
					{" "}
					remove
				</Typography>
				<Typography component="span" fontWeight="bold">
					{" "}
					{fullName}
				</Typography>
				<Typography component="span"> from your blacklist?</Typography>
			</Typography>
		</Div>
	);
};
