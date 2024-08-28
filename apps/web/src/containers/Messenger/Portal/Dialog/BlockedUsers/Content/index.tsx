import type { UserId, VoidWithArg } from "@repo/types";

import List from "./List";

interface Props {
	onItemLick: VoidWithArg<UserId>;
}

const Content: React.FC<Props> = ({ onItemLick }) => {
	return (
		<>
			<List onItemLick={onItemLick} />
		</>
	);
};

export default Content;
