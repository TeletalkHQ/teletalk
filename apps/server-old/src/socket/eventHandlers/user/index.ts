import { addContactWithCellphone } from "./addContactWithCellphone";
import { addContactWithUserId } from "./addContactWithUserId";
import { blockUser } from "./blockUser";
import { disconnect } from "./disconnect";
import { getAvatar } from "./getAvatar";
import { getClientStatus } from "./getClientStatus";
import { getContacts } from "./getContacts";
import { getOnlineClients } from "./getOnlineClients";
import { getPublicData } from "./getPublicData";
import { getUserData } from "./getUserData";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateAvatar } from "./updateAvatar";
import { updateContact } from "./updateContact";
import { updatePublicData } from "./updatePublicData";

export const userHandlers = {
	addContactWithCellphone,
	addContactWithUserId,
	blockUser,
	disconnect,
	getAvatar,
	getClientStatus,
	getContacts,
	getOnlineClients,
	getPublicData,
	getUserData,
	removeBlock,
	removeContact,
	updateAvatar,
	updateContact,
	updatePublicData,
};
