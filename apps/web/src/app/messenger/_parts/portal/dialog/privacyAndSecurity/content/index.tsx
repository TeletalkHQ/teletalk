import type { DialogStore } from "@repo/store";
import { type VoidWithArg } from "@repo/types";
import { List } from "@repo/ui/box/list";
import { FaComputer } from "react-icons/fa6";
import { TbUserOff } from "react-icons/tb";

import { ListItem, type PrivacyAndSecurityListItem } from "./listItem";

interface Props {
	onItemClick: VoidWithArg<DialogStore.DialogName>;
}

export const Content: React.FC<Props> = ({ onItemClick }) => (
	<List className="flex flex-col gap-2">
		{privacyAndSecurityList.map((item, index) => (
			<ListItem key={index} item={item} onItemClick={onItemClick} />
		))}
	</List>
);

export const privacyAndSecurityList: PrivacyAndSecurityListItem[] = [
	{
		displayName: "Blocked users",
		Icon: TbUserOff,
		name: "blockedUsers",
	},
	{
		displayName: "Sessions",
		Icon: FaComputer,
		name: "sessions",
	},
];
