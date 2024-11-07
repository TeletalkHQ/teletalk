import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	loading: boolean;
	onCancel: VoidNoArgs;
	onSaveClick: VoidNoArgs;
}

const Actions: React.FC<Props> = ({ loading, onCancel, onSaveClick }) => (
	<>
		<Button.SecondaryCancel onClick={onCancel} />
		<Button.PrimaryConfirm loading={loading} onClick={onSaveClick} />
	</>
);

export default Actions;
