import { useDialogState } from "@repo/hooks/useDialogState";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { SingleAction } from "@repo/ui/template/singleAction";

import { Content } from "./content";

export const BlockedUsers = () => {
	const dialogState = useDialogState("blockedUsers");

	return (
		<DialogTemplate
			actions={
				<SingleAction
					buttonProps={{
						onClick: dialogState.close,
					}}
				/>
			}
			content={<Content />}
			dialogState={dialogState}
			paperProps={{ className: "w-full max-w-md" }}
		/>
	);
};