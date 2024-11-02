import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	onCancel: VoidNoArgs;
	loading: boolean;
	onSaveClick: VoidNoArgs;
}

const Actions: React.FC<Props> = ({ loading, onCancel, onSaveClick }) => (
	<>
		<Button.SecondaryCancel onClick={onCancel} />

		<Button.PrimaryConfirm loading={loading} onClick={onSaveClick} />
	</>
);

export default Actions;
