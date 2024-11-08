import { VoidWithArg } from "@repo/types";
import { Box } from "@repo/ui";

import { GlobalStore } from "~/store";

import { privacyAndSecurityList } from "./data";
import { ListItem } from "./listItem";

interface Props {
	onItemClick: VoidWithArg<GlobalStore.DialogName>;
}

export const List: React.FC<Props> = ({ onItemClick }) => (
	<Box.List>
		{privacyAndSecurityList.map((item, index) => (
			<ListItem key={index} item={item} onItemClick={onItemClick} />
		))}
	</Box.List>
);
