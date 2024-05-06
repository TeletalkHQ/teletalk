import { VoidWithArg } from "@repo/type-store";

import { GlobalStore } from "~/store";

import List from "./List";

interface Props {
	onItemClick: VoidWithArg<GlobalStore.DialogName>;
}

const Content: React.FC<Props> = ({ onItemClick }) => (
	<>
		<List onItemClick={onItemClick} />
	</>
);

export default Content;
