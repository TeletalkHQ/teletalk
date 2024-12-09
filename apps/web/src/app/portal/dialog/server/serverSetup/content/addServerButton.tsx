import { type VoidNoArgs } from "@repo/types";
import { Button } from "@repo/ui/button/button";

interface Props {
	disabled: boolean;
	onAddServerClick: VoidNoArgs;
}

export const AddServerButton: React.FC<Props> = ({
	disabled,
	onAddServerClick,
}) => {
	return (
		<>
			<Button disabled={disabled} onClick={onAddServerClick}>
				Add server
			</Button>
		</>
	);
};
