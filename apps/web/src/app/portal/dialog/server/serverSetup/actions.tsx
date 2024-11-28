import { ServerAvailabilityStatusType } from "@repo/hooks";
import { VoidNoArgs } from "@repo/types";
import { Button } from "@repo/ui";

interface Props {
	disabled: boolean;
	isLoading: boolean;
	onSetup: VoidNoArgs;
	status: ServerAvailabilityStatusType;
}

export const Actions: React.FC<Props> = ({
	disabled,
	isLoading,
	onSetup,
	status,
}) => {
	return (
		<>
			<Button
				disabled={disabled}
				loading={isLoading}
				loadingIndicatorText={
					status === "online" ? "Forwarding..." : "Trying..."
				}
				onClick={onSetup}
			>
				Setup
			</Button>
		</>
	);
};
