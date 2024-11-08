import { VoidWithArg } from "@repo/types";

import { GlobalStore } from "~/store";

import { List } from "./list";

interface Props {
	onItemClick: VoidWithArg<GlobalStore.DialogName>;
}

export const Content: React.FC<Props> = ({ onItemClick }) => (
	<>
		<List onItemClick={onItemClick} />
	</>
);
