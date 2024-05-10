import { VoidNoArgsFn } from "@repo/type-store";

import { Button } from "~/components";

interface Props {
	onClose: VoidNoArgsFn;
	onEdit: VoidNoArgsFn;
	onDelete: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ onClose, onDelete, onEdit }) => (
	<>
		<Button.PrimaryClose onClick={onClose} />
		<Button.Primary onClick={onEdit}>Edit</Button.Primary>
		<Button.Secondary onClick={onDelete}>Delete</Button.Secondary>
	</>
);

export default Actions;
