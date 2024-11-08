import { VoidNoArgs } from "@repo/types";
import { Button } from "@repo/ui";

interface Props {
	onCancel: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({ onCancel }) => (
	<>
		<Button.PrimaryClose onClick={onCancel} />
	</>
);
