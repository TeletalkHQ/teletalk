import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	loading: boolean;
	onClose: VoidNoArgs;
	onRemove: VoidNoArgs;
}

const Actions: React.FC<Props> = ({ loading, onClose, onRemove }) => (
	<>
		<Button.PrimaryClose onClick={onClose} />

		<Button.SecondaryConfirm loading={loading} onClick={onRemove} />
	</>
);

export default Actions;
