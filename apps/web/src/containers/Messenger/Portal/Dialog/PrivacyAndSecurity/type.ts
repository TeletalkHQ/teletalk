import { SvgIconComponent } from "@mui/icons-material";

import { GlobalStore } from "~/store";

export interface PrivacyAndSecurityListItem {
	displayName: "Blocked users" | "Sessions";
	Icon: SvgIconComponent;
	name: GlobalStore.DialogName;
}
