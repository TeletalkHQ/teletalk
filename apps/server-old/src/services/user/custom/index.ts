import { addBlock } from "./addBlock";
import { addContact } from "./addContact";
import { addContactWithUserId } from "./addContactWithUserId";
import { addSession } from "./addSession";
import { createNewUser } from "./createNewUser";
import { findByCellphone } from "./findByCellphone";
import { findBySessionId } from "./findBySessionId";
import { findByUserId } from "./findByUserId";
import { getAvatar } from "./getAvatar";
import { getContacts } from "./getContacts";
import { getUserPublicInfo } from "./getUserPublicInfo";
import { isUserExist } from "./isUserExist";
import { logout } from "./logout";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateAvatar } from "./updateAvatar";
import { updateContact } from "./updateContact";
import { updateUserPublicInfo } from "./updateUserPublicInfo";

export const userServices = {
	addBlock,
	addSession,
	addContact,
	addContactWithUserId,
	createNewUser,
	findByCellphone,
	findBySessionId,
	findByUserId,
	getAvatar,
	getContacts,
	getUserPublicInfo,
	isUserExist,
	logout,
	removeBlock,
	removeContact,
	updateAvatar,
	updateContact,
	updateUserPublicInfo,
};
