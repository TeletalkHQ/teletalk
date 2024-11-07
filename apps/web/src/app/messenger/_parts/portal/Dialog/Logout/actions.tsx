import { VoidNoArgs } from "@repo/types";

import { Box, Button } from "~/components";

interface Props {
	loading: boolean;
	onClose: VoidNoArgs;
	onLogout: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({ loading, onClose, onLogout }) => (
	<>
		<Box.Div style={{ width: "35%" }}>
			<Button.PrimaryClose onClick={onClose} />
		</Box.Div>

		<Box.Div
			style={{
				width: "65%",
			}}
		>
			<Button.Secondary
				loading={loading}
				loadingIndicatorText="Logging out..."
				onClick={onLogout}
			>
				Log out
			</Button.Secondary>
		</Box.Div>
	</>
);
