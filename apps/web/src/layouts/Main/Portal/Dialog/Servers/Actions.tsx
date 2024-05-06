import { VoidNoArgsFn } from "@repo/type-store";

import { Button } from "~/components";

interface Props {
	onPingAllClick: VoidNoArgsFn;
	loading: boolean;
}

const Actions: React.FC<Props> = ({ loading, onPingAllClick }) => {
	return (
		<Button.Loading
			loading={loading}
			loadingIndicatorText="Pinging..."
			onClick={onPingAllClick}
		>
			Ping all servers
		</Button.Loading>
	);
};

export default Actions;
