"use client";

import { useDialogState } from "@repo/hooks/useDialogState";
import { useUpdateUserPublicInfo } from "@repo/hooks/useUpdateUserPublicInfo";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { Content } from "./content";

export const DeleteAvatar = () => {
	const dialogState = useDialogState("deleteAvatar");
	const { emitter, isLoading } = useUpdateUserPublicInfo();

	const handleDelete = () => {
		emitter({
			data: {
				avatarSrc: "",
			},
			options: {
				onSuccess: dialogState.close,
			},
		});
	};

	return (
		<>
			<DialogTemplate
				actions={
					<DoubleAction
						leftButtonProps={{ onClick: handleDelete }}
						rightButtonProps={{
							color: "error",
							loading: isLoading,
							loadingIndicator: "Deleting...",
							onClick: handleDelete,
						}}
					/>
				}
				content={<Content />}
				dialogState={dialogState}
			/>
		</>
	);
};
