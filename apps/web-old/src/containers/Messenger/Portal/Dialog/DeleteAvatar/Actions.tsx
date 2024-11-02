import { VoidNoArgs } from "@repo/types";

import { Box, Button } from "~/components";

interface Props {
	loading: boolean;
	onClose: VoidNoArgs;
	onDelete: VoidNoArgs;
}

const Actions: React.FC<Props> = ({ loading, onClose, onDelete }) => (
	<>
		<Box.Div style={{ width: "65%" }}>
			<Button.PrimaryClose onClick={onClose} />
		</Box.Div>

		<Box.Div
			style={{
				width: "35%",
			}}
		>
			<Button.SecondaryConfirm
				loading={loading}
				loadingIndicatorText="Deleting..."
				onClick={onDelete}
			/>
		</Box.Div>
	</>
);

export default Actions;
