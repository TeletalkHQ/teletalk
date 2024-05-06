import { ElementLabel, VoidWithArg } from "@repo/type-store";

import { DialogName, IconType } from "~/types";

export interface EditProfileListItem {
	name: DialogName;
	label: ElementLabel;
	disabled: boolean;
	value: string;
	Icon: IconType;
}

export type EditProfileListItemOnClick = VoidWithArg<EditProfileListItem>;
