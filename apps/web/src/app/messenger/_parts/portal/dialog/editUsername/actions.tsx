import { VoidNoArgs } from "@repo/types";
import { Button } from "@repo/ui";

interface Props {
	loading: boolean;
	onCancel: VoidNoArgs;
	onSaveClick: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({
	loading,
	onCancel,
	onSaveClick,
}) => (
	<>
		<Button.SecondaryCancel onClick={onCancel} />
		<Button.PrimaryConfirm loading={loading} onClick={onSaveClick} />
	</>
);
