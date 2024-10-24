import { VoidNoArgsFn } from "@repo/types";

import { Button } from "~/components";

interface Props {
	onCancel: VoidNoArgsFn;
	loading: boolean;
	onSaveClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onCancel, onSaveClick }) => (
	<>
		<Button.SecondaryCancel onClick={onCancel} />

		<Button.PrimaryConfirm loading={loading} onClick={onSaveClick} />
	</>
);

export default Actions;
