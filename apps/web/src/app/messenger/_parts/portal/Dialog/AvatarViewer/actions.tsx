import { VoidNoArgs } from "@repo/types";

import { Button } from "~/components";

interface Props {
	onClose: VoidNoArgs;
	onEdit: VoidNoArgs;
	onDelete: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({ onClose, onDelete, onEdit }) => (
	<>
		<Button.PrimaryClose onClick={onClose} />
		<Button.Primary onClick={onEdit}>Edit</Button.Primary>
		<Button.Secondary onClick={onDelete}>Delete</Button.Secondary>
	</>
);
