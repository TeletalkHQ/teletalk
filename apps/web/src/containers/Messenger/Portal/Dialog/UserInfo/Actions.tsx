import { VoidNoArgsFn } from "@repo/type-store";

import { Button } from "~/components";

interface Props {
	onClose: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ onClose }) => (
	<>
		<Button.PrimaryClose onClick={onClose} />
	</>
);

export default Actions;
