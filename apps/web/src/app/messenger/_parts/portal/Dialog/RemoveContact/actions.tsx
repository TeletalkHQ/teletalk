import { VoidNoArgs } from "@repo/types";
import { Button } from "@repo/ui";

interface Props {
	loading: boolean;
	onClose: VoidNoArgs;
	onRemove: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({ loading, onClose, onRemove }) => (
	<>
		<Button.PrimaryClose onClick={onClose} />

		<Button.SecondaryConfirm loading={loading} onClick={onRemove} />
	</>
);
