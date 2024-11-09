import { VoidNoArgs } from "@repo/types";
import { Box, Button } from "@repo/ui";

interface Props {
	isAddContactButtonDisabled: boolean;
	loading: boolean;
	onAddContactClick: VoidNoArgs;
	onCancelClick: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({
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
				<Button color="secondary" onClick={onCancelClick}>
					Cancel
				</Button>

				<Button
					disabled={isAddContactButtonDisabled}
					loading={loading}
					onClick={onAddContactClick}
				></Button>
			</Box.Flex>
		</>
	);
};
