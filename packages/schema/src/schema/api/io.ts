import { ZodSchema, z } from "zod";

import { baseSchema } from "../base";

export type IOSchema = {
	endpoint?: ZodSchema;
	input: ZodSchema;
	output: ZodSchema;
	pathname?: ZodSchema;
};

export const ioCollection = {
	addBlock: {
		input: z.object({
			userId: baseSchema.userId,
		}),
		output: z.object({
			blockedUser: baseSchema.blockedUser,
		}),
	},
	addContact: {
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
	},
	// connect: {
	// 	input: z.object({}),
	// 	output: z.object({}),
	// },
	// connect_error: {
	// 	input: z.object({}),
	// 	output: z.object({}),
	// },
	createNewUser: {
		input: z.object({
			firstName: baseSchema.firstName,
			lastName: baseSchema.lastName,
		}),
		output: z.object({}),
	},
	disconnect: {
		input: z.object({}),
		output: z.object({}),
	},
	getAvatar: {
		input: z.object({
			userId: baseSchema.userId,
		}),
		output: z.object({
			userId: baseSchema.userId,
			avatarSrc: baseSchema.avatarSrc,
		}),
	},
	getChatInfo: {
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
	},
	getClientStatus: {
		input: z.object({
			userId: baseSchema.userId,
		}),
		output: z.object({
			isOnline: baseSchema.isOnline,
			userId: baseSchema.userId,
		}),
	},
	getContacts: {
		input: z.object({}),
		output: z.object({
			contacts: baseSchema.contacts,
		}),
	},
	getCountries: {
		input: z.object({}),
		output: z.object({
			countries: baseSchema.countries,
		}),
	},
	getOnePrivateChat: {
		input: z.object({
			chatId: baseSchema.chatId,
		}),
		output: z.object({
			privateChat: baseSchema.privateChatsItem,
		}),
	},
	getOnlineClients: {
		input: z.object({}),
		output: z.object({
			onlineClients: baseSchema.onlineClients,
		}),
	},
	getPrivateChats: {
		input: z.object({}),
		output: z.object({
			privateChats: baseSchema.privateChats,
		}),
	},
	getStuff: {
		input: z.object({}),
		output: z.object({}),
	},
	getUserInfo: {
		input: z.object({}),
		output: z.object({
			userInfo: baseSchema.userInfo,
		}),
	},
	getUserPublicInfo: {
		input: z.object({
			userId: baseSchema.userId,
		}),
		output: z.object({
			publicInfo: baseSchema.userPublicInfo,
		}),
	},
	getWelcomeMessage: {
		input: z.object({}),
		output: z.object({
			welcomeMessage: baseSchema.welcomeMessage,
		}),
	},
	join: {
		input: z.object({}),
		output: z.object({}),
	},
	logout: {
		input: z.object({}),
		output: z.object({}),
	},
	ping: {
		input: z.object({}),
		output: z.object({
			pong: baseSchema.pong,
		}),
	},
	// pong: {
	// 	input: z.object({}),
	// 	output: z.object({}),
	// },
	removeBlock: {
		input: z.object({
			userId: baseSchema.userId,
		}),
		output: z.object({
			unblockedUser: z.object({
				userId: baseSchema.userId,
			}),
		}),
	},
	removeContact: {
		input: z.object({
			userId: baseSchema.userId,
		}),
		output: z.object({
			removedContact: z.object({
				userId: baseSchema.userId,
			}),
		}),
	},
	sendMessage: {
		input: z.object({
			messageText: baseSchema.messageText,
			targetParticipantId: baseSchema.participantId,
		}),
		output: z.object({
			chatId: baseSchema.chatId,
			addedMessage: baseSchema.messagesItem,
		}),
	},
	signIn: {
		input: baseSchema.cellphone,
		output: z.object({}),
	},
	updateAvatar: {
		input: z.object({
			avatarSrc: baseSchema.avatarSrc,
		}),
		output: z.object({
			userId: baseSchema.userId,
			avatarSrc: baseSchema.avatarSrc,
		}),
	},
	updateContact: {
		input: baseSchema.contactsItem,
		output: z.object({
			updatedContact: baseSchema.contactsItem,
		}),
	},
	updateUserPublicInfo: {
		input: z.object({
			bio: baseSchema.bio.optional(),
			firstName: baseSchema.firstName.optional(),
			lastName: baseSchema.lastName.optional(),
			username: baseSchema.username.optional(),
		}),
		output: z.object({
			updatedPublicInfo: baseSchema.userPublicInfo,
		}),
	},
	userFcm: {
		input: z.object({
			token: z.string(),
		}),
		output: z.object({}),
	},
	verify: {
		input: z.object({
			signInCode: baseSchema.signInCode,
		}),
		output: z.object({
			isNewUser: baseSchema.isNewUser,
		}),
	},
} satisfies Record<string, IOSchema>;

export type IOCollection = typeof ioCollection;

export type IOName = keyof IOCollection;
