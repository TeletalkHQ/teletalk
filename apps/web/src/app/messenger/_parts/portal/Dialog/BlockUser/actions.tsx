import { VoidNoArgs } from "@repo/types";
import { Button } from "@repo/ui";

interface Props {
	loading: boolean;
	onCancel: VoidNoArgs;
	onConfirm: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({ loading, onCancel, onConfirm }) => {
	return (
		<>
			<Button.PrimaryClose onClick={onCancel} />

			<Button.SecondaryConfirm loading={loading} onClick={onConfirm} />
		</>
	);
};
