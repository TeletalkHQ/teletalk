import { VoidNoArgs } from "@repo/types";

import { Box, Button } from "~/components";

interface Props {
	isConfirmDisabled: boolean;
	loading: boolean;
	onCancel: VoidNoArgs;
	onConfirm: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({
	isConfirmDisabled,
	loading,
	onCancel,
	onConfirm,
}) => {
	return (
		<>
			<Box.Flex
				ai="center"
				gap={1}
				jc="flex-end"
				style={{
					width: "100%",
				}}
			>
				<Button.SecondaryCancel onClick={onCancel} />

				<Button.PrimaryConfirm
					disabled={isConfirmDisabled}
					loading={loading}
					onClick={onConfirm}
				/>
			</Box.Flex>
		</>
	);
};
