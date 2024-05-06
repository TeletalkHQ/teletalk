import { VoidNoArgsFn } from "@repo/type-store";

import { Box, Button } from "~/components";

interface Props {
	isAddContactButtonDisabled: boolean;
	loading: boolean;
	onAddContactClick: VoidNoArgsFn;
	onCancel: VoidNoArgsFn;
}
const Actions: React.FC<Props> = ({
	isAddContactButtonDisabled,
	loading,
	onAddContactClick,
	onCancel,
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
					disabled={isAddContactButtonDisabled}
					loading={loading}
					onClick={onAddContactClick}
				/>
			</Box.Flex>
		</>
	);
};

export default Actions;
