import { useDialogState, useRemoveBlock } from "@repo/hooks";
import { DialogTemplate, DoubleAction } from "@repo/ui";

import { useUserStore } from "~/store";

import { Content } from "./content";

export const RemoveBlock = () => {
	const dialogState = useDialogState("removeBlock");

	const { emitter, isLoading } = useRemoveBlock();

	const selectedUserIdToUnblock = useUserStore((state) => state.userIdToBlock);

	const handleRemoveBlock = () => {
		if (selectedUserIdToUnblock)
			emitter({
				data: { userId: selectedUserIdToUnblock },
				options: { onSuccess: dialogState.close },
			});
	};

	return (
		<>
			<DialogTemplate
				actions={
					<DoubleAction
						cancelProps={{
							onClick: dialogState.close,
						}}
						confirmProps={{
							onClick: handleRemoveBlock,
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
