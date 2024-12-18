import { useConcatenatedFullName } from "@repo/hooks/useConcatenatedFullName";
import { Div } from "@repo/ui/box/div";
import { Typography } from "@repo/ui/typography/typography";

import { useUserStore } from "~/store";

export const Content: React.FC = () => {
	const userIdForRemoveContact = useUserStore(
		(state) => state.selectedUUID.to.removeContact
	);

	const fullName = useConcatenatedFullName({ userId: userIdForRemoveContact });

	return (
		<Div>
			<Typography>
				Are you sure you want to
				<Typography color="warning" component="span" fontWeight={"bold"}>
					{" "}
					remove
				</Typography>
			</Typography>
			<Typography component="span" fontWeight="bold">
				{fullName}
			</Typography>
			<Typography component="span"> from your contact list?</Typography>
		</Div>
	);
};
