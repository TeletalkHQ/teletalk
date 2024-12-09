import { useDialogStore } from "@repo/store";
import { Divider } from "@repo/ui/box/divider";
import { List } from "@repo/ui/box/list";

import { type SettingItem } from "../types";
import { settingsList } from "./data";
import { ListItem } from "./listItem";
import { ProfileOverview } from "./profileOverview";

export const Content: React.FC = () => {
	const dialogStore = useDialogStore();

	const handleSettingItemClick = (item: SettingItem) => {
		dialogStore.setOpenDialog(item.name, {
			forceZIndex: 1500,
		});
	};

	return (
		<>
			<ProfileOverview />

			<Divider style={{ margin: "20px 0px 20px 0px" }} />

			<List>
				{settingsList.map((item, i) => (
					<ListItem
						key={i}
						disabled={item.disabled}
						displayName={item.displayName}
						Icon={item.Icon}
						onClick={() => handleSettingItemClick(item)}
					/>
				))}
			</List>
		</>
	);
};
