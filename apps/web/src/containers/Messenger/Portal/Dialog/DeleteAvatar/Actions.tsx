import { VoidNoArgsFn } from "@repo/type-store";

import { Box, Button } from "~/components";

interface Props {
	loading: boolean;
	onClose: VoidNoArgsFn;
	onDelete: VoidNoArgsFn;
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
