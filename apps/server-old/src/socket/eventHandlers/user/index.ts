import { addBlock } from "./addBlock";
import { addContact } from "./addContact";
import { addContactWithUserId } from "./addContactWithUserId";
import { disconnect } from "./disconnect";
import { getAvatar } from "./getAvatar";
import { getClientStatus } from "./getClientStatus";
import { getContacts } from "./getContacts";
import { getOnlineClients } from "./getOnlineClients";
import { getUserData } from "./getUserData";
import { getUserPublicInfo } from "./getUserPublicInfo";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateAvatar } from "./updateAvatar";
import { updateContact } from "./updateContact";
import { updateUserPublicInfo } from "./updateUserPublicInfo";

export const userHandlers = {
	addContact,
	addContactWithUserId,
	addBlock,
	disconnect,
	getAvatar,
	getClientStatus,
	getContacts,
	getOnlineClients,
	getUserPublicInfo,
	getUserData,
	removeBlock,
	removeContact,
	updateAvatar,
	updateContact,
	updateUserPublicInfo,
};
