import { SvgIconComponent } from "@mui/icons-material";
import { DialogStore } from "@repo/store";

export interface PrivacyAndSecurityListItem {
	displayName: "Blocked users" | "Sessions";
	Icon: SvgIconComponent;
	name: DialogStore.DialogName;
}
