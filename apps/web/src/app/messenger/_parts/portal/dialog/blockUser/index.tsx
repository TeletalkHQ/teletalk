import { useAddBlock, useDialogState } from "@repo/hooks";
import { DialogTemplate, DoubleAction } from "@repo/ui";

import { useUserStore } from "~/store";

import { Content } from "./content";

export const BlockUser = () => {
	const selectedUserIdToBlock = useUserStore((state) => state.userIdToBlock);

	const dialogState = useDialogState("addBlock");

	const { emitter, isLoading } = useAddBlock();

	const handleConfirm = () => {
		if (selectedUserIdToBlock)
			emitter({
				data: {
					userId: selectedUserIdToBlock,
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
						cancelProps={{ onClick: dialogState.close }}
						confirmProps={{
							onClick: handleConfirm,
							loading: isLoading,
						}}
					/>
				}
				content={<Content />}
				dialogState={dialogState}
			/>
		</>
	);
};
