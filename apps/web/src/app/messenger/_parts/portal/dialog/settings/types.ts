import type { DialogStore } from "@repo/store";
import { type VoidWithArg } from "@repo/types";
import { type IconComponentType } from "@repo/ui/icons/dynamicIcon";

export type SettingItem = {
	disabled: boolean;
	displayName: string;
	Icon: IconComponentType;
	name: DialogStore.DialogName;
};

export type SettingsList = SettingItem[];

export type OnSettingItemClick = VoidWithArg<SettingItem>;
