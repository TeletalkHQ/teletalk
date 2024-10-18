import { addBlock } from "./addBlock";
import { addContact } from "./addContact";
import { addContactWithUserId } from "./addContactWithUserId";
import { disconnect } from "./disconnect";
import { getAvatar } from "./getAvatar";
import { getClientStatus } from "./getClientStatus";
import { getContacts } from "./getContacts";
import { getOnlineClients } from "./getOnlineClients";
import { getPublicInfo } from "./getPublicInfo";
import { getUserData } from "./getUserData";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateAvatar } from "./updateAvatar";
import { updateContact } from "./updateContact";
import { updatePublicInfo } from "./updatePublicInfo";

export const userHandlers = {
	addContact,
	addContactWithUserId,
	addBlock,
	disconnect,
	getAvatar,
	getClientStatus,
	getContacts,
	getOnlineClients,
	getPublicInfo,
	getUserData,
	removeBlock,
	removeContact,
	updateAvatar,
	updateContact,
	updatePublicInfo,
};
