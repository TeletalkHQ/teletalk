import { DialogStore } from "@repo/store";
import { VoidWithArg } from "@repo/types";
import { Box } from "@repo/ui";

import { privacyAndSecurityList } from "./data";
import { ListItem } from "./listItem";

interface Props {
	onItemClick: VoidWithArg<DialogStore.DialogName>;
}

export const Content: React.FC<Props> = ({ onItemClick }) => (
	<Box.List>
		{privacyAndSecurityList.map((item, index) => (
			<ListItem key={index} item={item} onItemClick={onItemClick} />
		))}
	</Box.List>
);
