import { SvgIconComponent } from "@mui/icons-material";

import { DialogName } from "~/types";

export interface PrivacyAndSecurityListItem {
  displayName: "Blocked users" | "Sessions";
  Icon: SvgIconComponent;
  name: DialogName;
}
