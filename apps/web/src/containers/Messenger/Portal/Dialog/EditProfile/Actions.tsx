import { VoidNoArgsFn } from "@repo/type-store";

import { Button } from "~/components";

interface Props {
	onCancel: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ onCancel }) => (
	<>
		<Button.PrimaryClose onClick={onCancel} />
	</>
);

export default Actions;
