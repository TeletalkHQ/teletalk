import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	onClose: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({ onClose }) => (
	<>
		<Button.PrimaryClose onClick={onClose} />
	</>
);
