import { VoidNoArgs } from "@repo/types";
import { Button } from "@repo/ui/button/button";

interface Props {
	isAddDisabled: boolean;
	isCloseDisabled: boolean;
	isLoading: boolean;
	isTestDisabled: boolean;
	onAddClick: VoidNoArgs;
	onClose: VoidNoArgs;
	onTestClick: VoidNoArgs;
}

export const Actions: React.FC<Props> = ({
	isAddDisabled,
	isCloseDisabled,
	isLoading,
	isTestDisabled,
	onAddClick,
	onClose,
	onTestClick,
}) => {
	return (
		<>
			<Button disabled={isCloseDisabled} onClick={onClose}>
				Close
			</Button>
			<Button
				disabled={isTestDisabled}
				loading={isLoading}
				loadingIndicatorText="Testing..."
				onClick={onTestClick}
			>
				Test
			</Button>

			<Button
				disabled={isAddDisabled}
				loadingIndicatorText="Adding..."
				onClick={onAddClick}
			>
				Add
			</Button>
		</>
	);
};
