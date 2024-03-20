import { appConfigs } from "~/classes/AppConfigs";
import { GlobalState } from "~/types";

export const defaultDialogState = {
  //TODO: read default value from mui
  props: {
    zIndex: 1300,
  },
};

export const dialogNames = [
  "addContactWithCellphone",
  "addContactWithUserId",
  "addServer",
  "advanced",
  "avatarSelector",
  "avatarViewer",
  "blockedUsers",
  "blockUser",
  "callSettings",
  "chatSettings",
  "contacts",
  "deleteAvatar",
  "editBio",
  "editContact",
  "editContactWithCellphone",
  "editFullName",
  "editPhoneNumber",
  "editProfile",
  "editUsername",
  "language",
  "logout",
  "notificationsAndSounds",
  "privacyAndSecurity",
  "privacyAndSecurity",
  "removeBlock",
  "removeContact",
  "servers",
  "serverSetup",
  "sessions",
  "settings",
  "userInfo",
] as const;

export const initialState: GlobalState = {
  contextMenu: {
    list: [],
    position: null,
  },
  dialogStates: [],
  drawer: {
    anchor: appConfigs.getConfigs().ui.drawerDefaultAnchor,
    open: false,
  },
  isInitialized: false,
  isOnline: false,
  loading: {
    color: "wheat",
    open: false,
    progressColor: "inherit",
    size: 80,
    speedMultiplier: 1,
    type: "FULL_PAGE",
  },
};
