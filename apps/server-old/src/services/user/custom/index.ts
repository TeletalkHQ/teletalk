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
import { getPublicInfo } from "./getPublicInfo";
import { isUserExist } from "./isUserExist";
import { logout } from "./logout";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateAvatar } from "./updateAvatar";
import { updateContact } from "./updateContact";
import { updatePublicInfo } from "./updatePublicInfo";

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
	getPublicInfo,
	isUserExist,
	logout,
	removeBlock,
	removeContact,
	updateAvatar,
	updateContact,
	updatePublicInfo,
};
