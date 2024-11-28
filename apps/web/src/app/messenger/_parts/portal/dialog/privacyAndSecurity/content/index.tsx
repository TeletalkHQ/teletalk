import { DialogStore } from "@repo/store";
import { VoidWithArg } from "@repo/types";
import { BlockIcon, DevicesIcon, List } from "@repo/ui";

import { ListItem, PrivacyAndSecurityListItem } from "./listItem";

interface Props {
	onItemClick: VoidWithArg<DialogStore.DialogName>;
}

export const Content: React.FC<Props> = ({ onItemClick }) => (
	<List>
		{privacyAndSecurityList.map((item, index) => (
			<ListItem key={index} item={item} onItemClick={onItemClick} />
		))}
	</List>
);

export const privacyAndSecurityList: PrivacyAndSecurityListItem[] = [
	{
		displayName: "Blocked users",
		Icon: BlockIcon,
		name: "blockedUsers",
	},
	{
		displayName: "Sessions",
		Icon: DevicesIcon,
		name: "sessions",
	},
];
