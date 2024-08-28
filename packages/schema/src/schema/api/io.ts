import { ZodSchema, z } from "zod";

import { EventName } from "../../classes";
import { baseSchema } from "../base";

export type IOSchema = { input: ZodSchema; output: ZodSchema };

export const ioCollection = {
	addContactWithCellphone: {
		input: z.object({
			countryCode: baseSchema.countryCode,
			countryName: baseSchema.countryName,
			firstName: baseSchema.firstName,
			lastName: baseSchema.lastName,
			phoneNumber: baseSchema.phoneNumber,
		}),
		output: z.object({
			newContact: baseSchema.contactsItem,
		}),
	},
	addBlock: {
		input: z.object({
			userId: baseSchema.userId,
		}),
		output: z.object({
			blockedUser: baseSchema.blockedUser,
		}),
	},
	// connect: {
	// 	input: z.undefined(),
	// 	output: z.undefined(),
	// },
	// connect_error: {
	// 	input: z.undefined(),
	// 	output: z.undefined(),
	// },
	createNewUser: {
		input: z.object({
			firstName: baseSchema.firstName,
			lastName: baseSchema.lastName,
		}),
		output: z.object({
			sessionId: baseSchema.sessionId,
		}),
	},
	disconnect: {
		input: z.undefined(),
		output: z.undefined(),
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
		input: z.undefined(),
		output: z.object({
			contacts: baseSchema.contacts,
		}),
	},
	getCountries: {
		input: z.undefined(),
		output: z.object({
			countries: baseSchema.countries,
		}),
	},
	getOnlineClients: {
		input: z.undefined(),
		output: z.object({
			onlineClients: baseSchema.onlineClients,
		}),
	},
	getPrivateChat: {
		input: z.object({
			chatId: baseSchema.chatId,
		}),
		output: z.object({
			privateChat: baseSchema.privateChatsItem,
		}),
	},
	getPrivateChats: {
		input: z.undefined(),
		output: z.object({
			privateChats: baseSchema.privateChats,
		}),
	},
	getPublicData: {
		input: z.object({
			userId: baseSchema.userId,
		}),
		output: z.object({
			publicData: baseSchema.publicData,
		}),
	},
	getStuff: {
		input: z.undefined(),
		output: z.undefined(),
	},
	getUserData: {
		input: z.undefined(),
		output: baseSchema.userData,
	},
	getWelcomeMessage: {
		input: z.undefined(),
		output: z.object({
			welcomeMessage: baseSchema.welcomeMessage,
		}),
	},
	join: {
		input: z.undefined(),
		output: z.undefined(),
	},
	logout: {
		input: z.undefined(),
		output: z.undefined(),
	},
	ping: {
		input: z.undefined(),
		output: z.object({
			pong: baseSchema.pong,
		}),
	},
	// pong: {
	// 	input: z.undefined(),
	// 	output: z.undefined(),
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
		output: z.object({
			sessionId: baseSchema.sessionId,
		}),
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
		input: z.object({
			firstName: baseSchema.firstName,
			lastName: baseSchema.lastName,
			userId: baseSchema.userId,
		}),
		output: z.object({
			updatedContact: z.object({
				firstName: baseSchema.firstName,
				lastName: baseSchema.lastName,
				userId: baseSchema.userId,
			}),
		}),
	},
	updatePublicData: {
		input: z.object({
			firstName: baseSchema.firstName,
			lastName: baseSchema.lastName,
			bio: baseSchema.bio,
			username: baseSchema.username,
		}),
		output: z.object({
			updatedPublicData: baseSchema.publicData,
		}),
	},
	verify: {
		input: z.object({
			verificationCode: baseSchema.verificationCode,
		}),
		output: z.object({
			isNewUser: baseSchema.isNewUser,
			sessionId: baseSchema.sessionId,
		}),
	},
} satisfies { [key in EventName]: IOSchema };

export type IOCollection = typeof ioCollection;
