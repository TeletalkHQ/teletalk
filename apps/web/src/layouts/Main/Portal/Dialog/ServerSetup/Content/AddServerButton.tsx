import { VoidNoArgsFn } from "@repo/type-store";

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
