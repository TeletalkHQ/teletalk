import BlockIcon from "@mui/icons-material/Block";
import DevicesIcon from "@mui/icons-material/Devices";

import { PrivacyAndSecurityListItem } from "../type";

export const privacyAndSecurityList: PrivacyAndSecurityListItem[] = [
  {
    displayName: "Blocked users",
    Icon: BlockIcon,
    name: "blockedUsers",
  },
  {
    displayName: "Sessions",
    Icon: DevicesIcon,
    name: "sessions",
  },
];
