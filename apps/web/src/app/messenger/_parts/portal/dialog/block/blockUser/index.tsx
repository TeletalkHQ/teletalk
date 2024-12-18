"use client";

import { useAddBlock } from "@repo/hooks/useAddBlock";
import { useConcatenatedFullName } from "@repo/hooks/useConcatenatedFullName";
import { useDialogState } from "@repo/hooks/useDialogState";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { useUserStore } from "~/store";

import { Content } from "./content";
import { Title } from "./title";

export const BlockUser = () => {
	const selectedUUID = useUserStore((state) => state.selectedUUID);

	const dialogState = useDialogState("addBlock");

	const { emitter, isLoading } = useAddBlock();

	const fullName = useConcatenatedFullName({ userId: selectedUUID.to.block });

	const handleConfirm = () => {
		//TODO: Toast Error
		if (!selectedUUID.to.block) return;

		emitter({
			data: {
				userId: selectedUUID.to.block,
			},
			options: {
				onSuccess: dialogState.close,
			},
		});
	};

	return (
		<DialogTemplate
			actions={
				<DoubleAction
					leftButtonProps={{ onClick: dialogState.close }}
					rightButtonProps={{
						onClick: handleConfirm,
						loading: isLoading,
					}}
				/>
			}
			content={<Content fullName={fullName} />}
			dialogState={dialogState}
			title={<Title fullName={fullName} />}
		/>
	);
};
