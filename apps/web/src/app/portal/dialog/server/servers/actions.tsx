import { VoidNoArgs } from "@repo/types";
import { Button } from "@repo/ui";

interface Props {
	onPingAllClick: VoidNoArgs;
	isLoading: boolean;
}

export const Actions: React.FC<Props> = ({ isLoading, onPingAllClick }) => {
	return (
		<Button
			loading={isLoading}
			loadingIndicatorText="Pinging..."
			onClick={onPingAllClick}
		>
			Ping all servers
		</Button>
	);
};
