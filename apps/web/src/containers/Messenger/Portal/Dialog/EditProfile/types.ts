import { ElementLabel } from "@repo/utils";

import { DialogName, IconType, VoidWithArg } from "~/types";

export interface EditProfileListItem {
	name: DialogName;
	label: ElementLabel;
	disabled: boolean;
	value: string;
	Icon: IconType;
}

export type EditProfileListItemOnClick = VoidWithArg<EditProfileListItem>;
