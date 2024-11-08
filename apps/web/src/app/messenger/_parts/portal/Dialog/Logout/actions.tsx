import { VoidNoArgs } from "@repo/types";
import { Box, Button } from "@repo/ui";

interface Props {
	loading: boolean;
	onClose: VoidNoArgs;
	onLogout: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({ loading, onClose, onLogout }) => (
	<>
		<Box.Div style={{ width: "35%" }}>
			<Button onClick={onClose}>Close</Button>
		</Box.Div>

		<Box.Div
			style={{
				width: "65%",
			}}
		>
			<Button
				color="secondary"
				loading={loading}
				loadingIndicatorText="Logging out..."
				onClick={onLogout}
			>
				Log out
			</Button>
		</Box.Div>
	</>
);
