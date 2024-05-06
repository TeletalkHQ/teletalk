import { VoidNoArgsFn } from "@repo/type-store";

import { Box, Button } from "~/components";

interface Props {
	isAddContactButtonDisabled: boolean;
	loading: boolean;
	onAddContactClick: VoidNoArgsFn;
	onCancelClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({
	isAddContactButtonDisabled,
	loading,
	onAddContactClick,
	onCancelClick,
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
				<Button.SecondaryCancel onClick={onCancelClick} />

				<Button.PrimaryConfirm
					disabled={isAddContactButtonDisabled}
					loading={loading}
					onClick={onAddContactClick}
				/>
			</Box.Flex>
		</>
	);
};

export default Actions;
