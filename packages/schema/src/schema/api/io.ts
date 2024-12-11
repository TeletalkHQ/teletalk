import type { ZodSchema, ZodUndefined } from "zod";
import { z } from "zod";

import { baseSchema } from "../base";

export type IOSchema = {
	input: ZodSchema | ZodUndefined;
	output: ZodSchema | ZodUndefined;
	params: ZodSchema | ZodUndefined;
	pathnames: ZodSchema | ZodUndefined;
};

export const addBlockIO = {
	input: z.object({
		userId: baseSchema.userId,
	}),
	output: z.object({
		blockedUser: baseSchema.blockedUser,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const addContactIO = {
	input: z.object({
		countryCode: baseSchema.countryCode.optional(),
		countryName: baseSchema.countryName.optional(),
		firstName: baseSchema.firstName,
		lastName: baseSchema.lastName.optional(),
		phoneNumber: baseSchema.phoneNumber.optional(),
		userId: baseSchema.userId,
	}),
	output: z.object({
		newContact: baseSchema.contactsItem,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};
// connect: {
// 	input: z.object({}),
// 	output: z.object({}),
// },
// connect_error: {
// 	input: z.object({}),
// 	output: z.object({}),
// };

export const createUserIO = {
	input: z.object({
		firstName: baseSchema.firstName,
		lastName: baseSchema.lastName,
	}),
	output: z.object({}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const disconnectIO = {
	input: z.object({}),
	output: z.object({}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getAvatarIO = {
	input: z.object({
		userId: baseSchema.userId,
	}),
	output: z.object({
		userId: baseSchema.userId,
		avatarSrc: baseSchema.avatarSrc,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getChatInfoIO = {
	input: z.object({
		chatId: baseSchema.chatId,
	}),
	output: z.object({
		chatInfo: z.object({
			chatId: baseSchema.chatId,
			createdAt: baseSchema.createdAt,
			participants: baseSchema.participants,
		}),
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getClientStatusIO = {
	input: z.object({
		userId: baseSchema.userId,
	}),
	output: z.object({
		isOnline: baseSchema.isOnline,
		userId: baseSchema.userId,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getContactsIO = {
	input: z.object({}),
	output: z.object({
		contacts: baseSchema.contacts,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getCountriesIO = {
	input: z.object({}),
	output: z.object({
		countries: baseSchema.countries,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getOnePrivateChatIO = {
	input: z.object({
		chatId: baseSchema.chatId,
	}),
	output: z.object({
		privateChat: baseSchema.privateChatsItem,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getOnlineClientsIO = {
	input: z.object({}),
	output: z.object({
		onlineClients: baseSchema.onlineClients,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getPrivateChatsIO = {
	input: z.object({}),
	output: z.object({
		privateChats: baseSchema.privateChats,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getStuffIO = {
	input: z.object({}),
	output: z.object({}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getUserInfoIO = {
	input: z.object({}),
	output: z.object({
		userInfo: baseSchema.userInfo,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getUserPublicInfoIO = {
	input: z.object({
		userId: baseSchema.userId,
	}),
	output: z.object({
		userPublicInfo: baseSchema.userPublicInfo,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const getWelcomeMessageIO = {
	input: z.object({}),
	output: z.object({
		welcomeMessage: baseSchema.welcomeMessage,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const joinIO = {
	input: z.object({}),
	output: z.object({}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const logoutIO = {
	input: z.object({}),
	output: z.object({}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const pingIO = {
	input: z.object({}),
	output: z.object({
		pong: baseSchema.pong,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};
// pong: {
// 	input: z.object({}),
// 	output: z.object({}),
// };

export const removeBlockIO = {
	input: z.object({
		userId: baseSchema.userId,
	}),
	output: z.object({
		unblockedUser: z.object({
			userId: baseSchema.userId,
		}),
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const removeContactIO = {
	input: z.object({
		userId: baseSchema.userId,
	}),
	output: z.object({
		removedContact: z.object({
			userId: baseSchema.userId,
		}),
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const sendMessageIO = {
	input: z.object({
		messageText: baseSchema.messageText,
		targetParticipantId: baseSchema.participantId,
	}),
	output: z.object({
		chatId: baseSchema.chatId,
		addedMessage: baseSchema.messagesItem,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const signInIO = {
	input: baseSchema.cellphone,
	output: z.object({}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const updateAvatarIO = {
	input: z.object({
		avatarSrc: baseSchema.avatarSrc,
	}),
	output: z.object({
		userId: baseSchema.userId,
		avatarSrc: baseSchema.avatarSrc,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const updateContactIO = {
	input: baseSchema.contactsItem,
	output: z.object({
		updatedContact: baseSchema.contactsItem,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const updateUserPublicInfoIO = {
	input: z.object({
		avatarSrc: baseSchema.avatarSrc.optional(),
		bio: baseSchema.bio.optional(),
		firstName: baseSchema.firstName.optional(),
		lastName: baseSchema.lastName.optional(),
		username: baseSchema.username.optional(),
	}),
	output: z.object({
		updatedPublicInfo: baseSchema.userPublicInfo,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const userFcmIO = {
	input: z.object({
		token: z.string(),
	}),
	output: z.object({}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export const verifyIO = {
	input: z.object({
		signInCode: baseSchema.signInCode,
	}),
	output: z.object({
		isNewUser: baseSchema.isNewUser,
	}),
	params: z.undefined(),
	pathnames: z.undefined(),
};

export type IOCollection = {
	addBlock: typeof addBlockIO;
	addContact: typeof addContactIO;
	createUser: typeof createUserIO;
	disconnect: typeof disconnectIO;
	getAvatar: typeof getAvatarIO;
	getChatInfo: typeof getChatInfoIO;
	getClientStatus: typeof getClientStatusIO;
	getContacts: typeof getContactsIO;
	getCountries: typeof getCountriesIO;
	getOnePrivateChat: typeof getOnePrivateChatIO;
	getOnlineClients: typeof getOnlineClientsIO;
	getPrivateChats: typeof getPrivateChatsIO;
	getStuff: typeof getStuffIO;
	getUserInfo: typeof getUserInfoIO;
	getUserPublicInfo: typeof getUserPublicInfoIO;
	getWelcomeMessage: typeof getWelcomeMessageIO;
	join: typeof joinIO;
	logout: typeof logoutIO;
	ping: typeof pingIO;
	removeBlock: typeof removeBlockIO;
	removeContact: typeof removeContactIO;
	sendMessage: typeof sendMessageIO;
	signIn: typeof signInIO;
	updateAvatar: typeof updateAvatarIO;
	updateContact: typeof updateContactIO;
	updateUserPublicInfo: typeof updateUserPublicInfoIO;
	userFcm: typeof userFcmIO;
	verify: typeof verifyIO;
};

export type IOName = keyof IOCollection;
