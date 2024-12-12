import type { DialogStore } from "@repo/store";
import { type VoidWithArg } from "@repo/types";
import { ListItemButton } from "@repo/ui/box/listItemButton";
import { Span } from "@repo/ui/box/span";
import {
	DynamicIcon,
	type IconComponentType,
} from "@repo/ui/icons/dynamicIcon";

export interface PrivacyAndSecurityListItem {
	displayName: "Blocked users" | "Sessions";
	Icon: IconComponentType;
	name: DialogStore.DialogName;
}

interface Props {
	item: PrivacyAndSecurityListItem;
	onItemClick: VoidWithArg<DialogStore.DialogName>;
}

export const ListItem: React.FC<Props> = ({
	item: { Icon, displayName, name },
	onItemClick,
}) => (
	<ListItemButton
		style={{
			display: "flex",
			height: "65px",
			borderRadius: "10px",
			gap: 10,
			alignItems: "center",
		}}
		onClick={() => onItemClick(name)}
	>
		<Span
			style={{
				marginTop: "5px",
			}}
		>
			<DynamicIcon icon={Icon} />
		</Span>
		<Span>{displayName}</Span>
	</ListItemButton>
);
