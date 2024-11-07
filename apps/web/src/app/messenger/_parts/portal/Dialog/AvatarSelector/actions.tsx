import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	isSaveDisabled: boolean;
	loading: boolean;
	onClose: VoidNoArgs;
	onSave: VoidNoArgs;
}

const Actions: React.FC<Props> = ({
	isSaveDisabled,
	loading,
	onClose,
	onSave,
}) => (
	<>
		<Button.PrimaryClose onClick={onClose} />

		<Button.Primary
			disabled={isSaveDisabled}
			loading={loading}
			loadingIndicatorText="Saving..."
			onClick={onSave}
		>
			Save
		</Button.Primary>
	</>
);

export default Actions;
