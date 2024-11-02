import { DialogState, State } from "./types";

export const dialogNames = [
	"addContact",
	"addContactWithUserId",
	"addServer",
	"advanced",
	"avatarSelector",
	"avatarViewer",
	"blockedUsers",
	"addBlock",
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

export const defaultDialogProps: DialogState["props"] = {
	zIndex: 1300,
	shouldKeepOpenCurrentDialog: false,
};
export const initialState: State = {
	// TODO: Convert to record
	dialogStates: [],
};
