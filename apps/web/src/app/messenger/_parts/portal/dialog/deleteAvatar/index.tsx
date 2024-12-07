import { useDialogState, useUpdateUserPublicInfo } from "@repo/hooks";
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
						cancelProps={{ onClick: handleDelete }}
						confirmProps={{
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
