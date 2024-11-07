import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	onClose: VoidNoArgs;
}

const Actions: React.FC<Props> = ({ onClose }) => (
	<>
		<Button.PrimaryClose onClick={onClose} />
	</>
);

export default Actions;
