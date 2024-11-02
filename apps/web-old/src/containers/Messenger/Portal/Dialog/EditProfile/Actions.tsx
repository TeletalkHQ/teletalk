import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	onCancel: VoidNoArgs;
}

const Actions: React.FC<Props> = ({ onCancel }) => (
	<>
		<Button.PrimaryClose onClick={onCancel} />
	</>
);

export default Actions;
