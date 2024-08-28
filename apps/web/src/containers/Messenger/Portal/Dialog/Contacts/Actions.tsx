import { VoidNoArgsFn } from "@repo/types";

import { Box, Button } from "~/components";

interface Props {
	onClose: VoidNoArgsFn;
	onAddContactClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ onClose, onAddContactClick }) => (
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

export default Actions;
