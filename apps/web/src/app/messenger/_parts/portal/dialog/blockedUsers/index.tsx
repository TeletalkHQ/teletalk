"use client";

import { useDialogState } from "@repo/hooks/useDialogState";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { SingleAction } from "@repo/ui/template/singleAction";

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
