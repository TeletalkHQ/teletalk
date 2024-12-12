import type { VoidNoArgs } from "@repo/types";
import { Div } from "@repo/ui/box/div";
import { Button } from "@repo/ui/button/button";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import type { IconComponentType } from "@repo/ui/icons/dynamicIcon";
import { BsRobot } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import { PiChatsCircle } from "react-icons/pi";
import { RiGroupLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiAnnouncement } from "react-icons/tfi";
import { VscSettings } from "react-icons/vsc";

import { useGlobalStore } from "~/store";

interface SideBarItem {
	name: string;
	Icon: IconComponentType;
	onClick?: VoidNoArgs;
}

export const Sidebar = () => {
	const globalStore = useGlobalStore();

	const openDrawer = () => {
		globalStore.updateIsDrawerOpen(true);
	};

	const sidebarList: Array<SideBarItem> = [
		{ name: "sidebar", Icon: RxHamburgerMenu, onClick: openDrawer },
		{ name: "chats", Icon: PiChatsCircle },
		{ name: "unread", Icon: MdOutlineMarkChatUnread },
		{ name: "personal", Icon: RiGroupLine },
		{ name: "channels", Icon: TfiAnnouncement },
		{ name: "groups", Icon: GrGroup },
		{ name: "bots", Icon: BsRobot },
		{ name: "edit", Icon: VscSettings },
	];

	return (
		<Div className="flex flex-col gap-2 h-full">
			{sidebarList.map(({ Icon, onClick }, index) => {
				return (
					<Button
						key={index}
						className="size-14"
						variant="text"
						onClick={onClick}
					>
						<DynamicIcon fontSize={22} icon={Icon} />
					</Button>
				);
			})}
		</Div>
	);
};
