import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	loading: boolean;
	onCancel: VoidNoArgs;
	onConfirm: VoidNoArgs;
}

const Actions: React.FC<Props> = ({ loading, onCancel, onConfirm }) => {
	return (
		<>
			<Button.PrimaryClose onClick={onCancel} />

			<Button.SecondaryConfirm loading={loading} onClick={onConfirm} />
		</>
	);
};

export default Actions;
