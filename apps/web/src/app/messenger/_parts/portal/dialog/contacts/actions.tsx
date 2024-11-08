import { VoidNoArgs } from "@repo/types";
import { Box, Button } from "@repo/ui";

interface Props {
	onClose: VoidNoArgs;
	onAddContactClick: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({ onClose, onAddContactClick }) => (
	<>
		<Box.Flex
			ai="center"
			jc="space-between"
			sx={{
				width: "100%",
			}}
		>
			<Button.PrimaryClose onClick={onClose} />

			<Button.PrimaryText onClick={onAddContactClick}>
				Add Contact
			</Button.PrimaryText>
		</Box.Flex>
	</>
);
