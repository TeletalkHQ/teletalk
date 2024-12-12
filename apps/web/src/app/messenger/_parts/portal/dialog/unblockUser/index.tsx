import { useDialogState } from "@repo/hooks/useDialogState";
import { useRemoveBlock } from "@repo/hooks/useRemoveBlock";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { useUserStore } from "~/store";

import { Content } from "./content";

export const UnblockUser = () => {
	const dialogState = useDialogState("removeBlock");

	const { emitter, isLoading } = useRemoveBlock();

	const selectedUserIdToUnblock = useUserStore(
		(state) => state.selectedUUID.to.unblock
	);

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
