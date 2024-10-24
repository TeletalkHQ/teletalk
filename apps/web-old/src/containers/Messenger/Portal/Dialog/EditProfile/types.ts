import { ElementLabel, VoidWithArg } from "@repo/types";

import { GlobalStore } from "~/store";
import { IconType } from "~/types";

export interface EditProfileListItem {
	name: GlobalStore.DialogName;
	label: ElementLabel;
	disabled: boolean;
	value: string;
	Icon: IconType;
}

export type EditProfileListItemOnClick = VoidWithArg<EditProfileListItem>;
