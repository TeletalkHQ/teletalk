import { VoidNoArgs } from "@repo/types";

import { Box, Button } from "~/components";

interface Props {
	isAddContactButtonDisabled: boolean;
	loading: boolean;
	onAddContactClick: VoidNoArgs;
	onCancel: VoidNoArgs;
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
