import AccountBoxTwoTone from "@mui/icons-material/AccountBoxTwoTone";
import AlternateEmailTwoTone from "@mui/icons-material/AlternateEmailTwoTone";
import CallTwoTone from "@mui/icons-material/CallTwoTone";
import SettingsAccessibilityTwoToneIcon from "@mui/icons-material/SettingsAccessibilityTwoTone";

import { EditProfileListItem } from "../types";

export const makeList = ({
  bio = "",
  fullName = "",
  fullNumber = "",
  username = "",
}): EditProfileListItem[] => [
  {
    disabled: false,
    Icon: SettingsAccessibilityTwoToneIcon,
    label: "Bio",
    name: "editBio",
    value: bio,
  },
  {
    disabled: false,
    Icon: AccountBoxTwoTone,
    label: "Name",
    name: "editFullName",
    value: fullName,
  },
  {
    disabled: true,
    Icon: CallTwoTone,
    label: "Phone Number",
    name: "editPhoneNumber",
    value: fullNumber,
  },
  {
    disabled: false,
    Icon: AlternateEmailTwoTone,
    label: "Username",
    name: "editUsername",
    value: username || "Not set",
  },
];
