import { DialogStore } from "@repo/store";
import { VoidWithArg } from "@repo/types";
import { ListItemButton, Span } from "@repo/ui";
import { GeneratedIcon } from "@repo/ui/utils";

export interface PrivacyAndSecurityListItem {
	displayName: "Blocked users" | "Sessions";
	Icon: GeneratedIcon;
	name: DialogStore.DialogName;
}

interface Props {
	item: PrivacyAndSecurityListItem;
	onItemClick: VoidWithArg<DialogStore.DialogName>;
}

export const ListItem: React.FC<Props> = ({ item, onItemClick }) => (
	<ListItemButton
		style={{
			display: "flex",
			height: "65px",
			borderRadius: "10px",
			gap: 10,
			alignItems: "center",
		}}
		onClick={() => onItemClick(item.name)}
	>
		<Span
			style={{
				marginTop: "5px",
			}}
		>
			<item.Icon />
		</Span>
		<Span>{item.displayName}</Span>
	</ListItemButton>
);
