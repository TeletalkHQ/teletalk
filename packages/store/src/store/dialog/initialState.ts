import { type DialogState, type State } from "./types";

export const dialogNames = [
	"addBlock",
	"addContact",
	"addServer",
	"advanced",
	"avatarSelector",
	"avatarViewer",
	"blockedUsers",
	"callSettings",
	"chatSettings",
	"contacts",
	"deleteAvatar",
	"editBio",
	"editContact",
	"editContact",
	"editFullName",
	"editPhoneNumber",
	"editUsername",
	"batteryAndAnimations",
	"folders",
	"language",
	"logout",
	"myProfile",
	"notificationsAndSounds",
	"privacyAndSecurity",
	"privacyAndSecurity",
	"removeBlock",
	"removeContact",
	"serverSetup",
	"servers",
	"sessions",
	"settings",
	"speakersAndCamera",
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
