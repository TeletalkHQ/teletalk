import { useDialogState } from "@repo/hooks";
import { DialogTemplate, SingleAction } from "@repo/ui";

import { Content } from "./content";

export const BlockedUsers = () => {
	const dialogState = useDialogState("blockedUsers");

	return (
		<>
			<DialogTemplate
				actions={
					<SingleAction
						closeProps={{
							onClick: dialogState.close,
						}}
					/>
				}
				content={<Content />}
				dialogState={dialogState}
			/>
		</>
	);
};
