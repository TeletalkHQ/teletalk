import { DialogStore } from "@repo/store";
import { VoidWithArg } from "@repo/types";
import { List } from "@repo/ui/box/list";
import { AccountBoxIcon } from "@repo/ui/icons/accountBox";

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
		Icon: AccountBoxIcon,
		name: "blockedUsers",
	},
	{
		displayName: "Sessions",
		Icon: AccountBoxIcon,
		name: "sessions",
	},
];
