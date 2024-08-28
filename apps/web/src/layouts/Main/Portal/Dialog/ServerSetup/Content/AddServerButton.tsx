import { VoidNoArgsFn } from "@repo/types";

import { Button } from "~/components";

interface Props {
	disabled: boolean;
	onAddServerClick: VoidNoArgsFn;
}

const AddServerButton: React.FC<Props> = ({ disabled, onAddServerClick }) => {
	return (
		<>
			<Button.Primary disabled={disabled} onClick={onAddServerClick}>
				Add server
			</Button.Primary>
		</>
	);
};

export default AddServerButton;
