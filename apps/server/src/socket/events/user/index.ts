import {
	AddBlockIO,
	AddContactWithCellphoneIO,
	AddContactWithUserIdIO,
	DisconnectIO,
	GetAvatarIO,
	GetClientStatusIO,
	GetContactsIO,
	GetOnlineClientsIO,
	GetPublicDataIO,
	GetUserDataIO,
	RemoveBlockIO,
	RemoveContactIO,
	UpdateAvatarIO,
	UpdateContactIO,
	UpdatePublicDataIO,
} from "@repo/type-store";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import { validationModels } from "~/models/validation";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const addBlock = builder
	.create<AddBlockIO>()
	.name("addBlock")
	.inputSchema({
		userId: validationModels.userId,
	})
	.outputSchema({
		blockedUser: {
			type: "object",
			props: {
				userId: validationModels.userId,
			},
		},
	})
	.handler(handlers.addBlock)
	.build();

const addContactWithCellphone = builder
	.create<AddContactWithCellphoneIO>()
	.name("addContactWithCellphone")
	.inputSchema({
		countryCode: validationModels.countryCode,
		countryName: validationModels.countryName,
		phoneNumber: validationModels.phoneNumber,
		firstName: validationModels.firstName,
		lastName: validationModels.lastName,
	})
	.outputSchema({
		newContact: {
			type: "object",
			props: {
				countryCode: validationModels.countryCode,
				countryName: validationModels.countryName,
				phoneNumber: validationModels.phoneNumber,
				firstName: validationModels.firstName,
				lastName: validationModels.lastName,
				userId: validationModels.userId,
			},
		},
	})
	.handler(handlers.addContactWithCellphone)
	.build();

const addContactWithUserId = builder
	.create<AddContactWithUserIdIO>()
	.name("addContactWithUserId")
	.inputSchema({
		firstName: validationModels.firstName,
		lastName: validationModels.lastName,
		userId: validationModels.userId,
	})
	.outputSchema({
		newContact: {
			type: "object",
			props: {
				countryCode: validationModels.countryCode,
				countryName: validationModels.countryName,
				phoneNumber: validationModels.phoneNumber,
				firstName: validationModels.firstName,
				lastName: validationModels.lastName,
				userId: validationModels.userId,
			},
		},
	})
	.handler(handlers.addContactWithUserId)
	.build();

//FIXME: Add IO
const disconnect = builder
	.create<DisconnectIO>()
	.name("disconnect")
	.noAuth()
	.handler(handlers.disconnect)
	.build();

const updateContact = builder
	.create<UpdateContactIO>()
	.name("updateContact")
	.inputSchema({
		firstName: validationModels.firstName,
		lastName: validationModels.lastName,
		userId: validationModels.userId,
	})
	.outputSchema({
		updatedContact: {
			type: "object",
			props: {
				firstName: validationModels.firstName,
				lastName: validationModels.lastName,
				userId: validationModels.userId,
			},
		},
	})
	.handler(handlers.updateContact)
	.build();

const getContacts = builder
	.create<GetContactsIO>()
	.name("getContacts")
	.outputSchema({
		contacts: {
			type: "array",
			items: {
				type: "object",
				countryCode: validationModels.countryCode,
				countryName: validationModels.countryName,
				phoneNumber: validationModels.phoneNumber,
				firstName: validationModels.firstName,
				lastName: validationModels.lastName,
				userId: validationModels.userId,
			},
		},
	})
	.handler(handlers.getContacts)
	.build();

const getUserData = builder
	.create<GetUserDataIO>()
	.name("getUserData")
	.outputSchema({
		avatarSrc: validationModels.avatarSrc,
		bio: validationModels.bio,
		blacklist: {
			type: "array",
			items: {
				type: "object",
				userId: validationModels.userId,
			},
		},
		contacts: {
			type: "array",
			items: {
				type: "object",
				countryCode: validationModels.countryCode,
				countryName: validationModels.countryName,
				phoneNumber: validationModels.phoneNumber,
				firstName: validationModels.firstName,
				lastName: validationModels.lastName,
				userId: validationModels.userId,
			},
		},
		countryCode: validationModels.countryCode,
		countryName: validationModels.countryName,
		createdAt: validationModels.createdAt,
		firstName: validationModels.firstName,
		lastName: validationModels.lastName,
		phoneNumber: validationModels.phoneNumber,
		status: validationModels.status,
		userId: validationModels.userId,
		username: validationModels.username,
	})
	.handler(handlers.getUserData)
	.build();

const getClientStatus = builder
	.create<GetClientStatusIO>()
	.name("getClientStatus")
	.inputSchema({
		userId: validationModels.userId,
	})
	.outputSchema({
		isOnline: validationModels.isOnline,
		userId: validationModels.userId,
	})
	.handler(handlers.getClientStatus)
	.build();

const getOnlineClients = builder
	.create<GetOnlineClientsIO>()
	.name("getOnlineClients")
	.outputSchema({
		onlineClients: {
			type: "array",
			items: {
				type: "object",
				userId: validationModels.userId,
			},
		},
	})
	.handler(handlers.getOnlineClients)
	.build();

const getPublicData = builder
	.create<GetPublicDataIO>()
	.name("getPublicData")
	.inputSchema({
		userId: validationModels.userId,
	})
	.outputSchema({
		publicData: {
			type: "object",
			props: {
				firstName: validationModels.firstName,
				lastName: validationModels.lastName,
				bio: validationModels.bio,
				userId: validationModels.userId,
				username: validationModels.username,
			},
		},
	})
	.handler(handlers.getPublicData)
	.build();

const removeBlock = builder
	.create<RemoveBlockIO>()
	.name("removeBlock")
	.inputSchema({
		userId: validationModels.userId,
	})
	.outputSchema({
		removedBlock: {
			type: "object",
			props: {
				userId: validationModels.userId,
			},
		},
	})
	.handler(handlers.removeBlock)
	.build();

const removeContact = builder
	.create<RemoveContactIO>()
	.name("removeContact")
	.inputSchema({
		userId: validationModels.userId,
	})
	.outputSchema({
		removedContact: {
			type: "object",
			props: {
				userId: validationModels.userId,
			},
		},
	})
	.handler(handlers.removeContact)
	.build();

const updatePublicData = builder
	.create<UpdatePublicDataIO>()
	.name("updatePublicData")
	.inputSchema({
		firstName: validationModels.firstName,
		lastName: validationModels.lastName,
		bio: validationModels.bio,
		username: validationModels.username,
	})
	.outputSchema({
		publicData: {
			type: "object",
			props: {
				firstName: validationModels.firstName,
				lastName: validationModels.lastName,
				bio: validationModels.bio,
				userId: validationModels.userId,
				username: validationModels.username,
			},
		},
	})
	.handler(handlers.updatePublicData)
	.build();

const getAvatar = builder
	.create<GetAvatarIO>()
	.name("getAvatar")
	.inputSchema({
		userId: validationModels.userId,
	})
	.outputSchema({
		userId: validationModels.userId,
		avatarSrc: validationModels.avatarSrc,
	})
	.handler(handlers.getAvatar)
	.build();

const updateAvatar = builder
	.create<UpdateAvatarIO>()
	.name("updateAvatar")
	.inputSchema({
		avatarSrc: validationModels.avatarSrc,
	})
	.outputSchema({
		userId: validationModels.userId,
		avatarSrc: validationModels.avatarSrc,
	})
	.handler(handlers.updateAvatar)
	.build();

export const user = {
	events: [
		addBlock,
		addContactWithCellphone,
		addContactWithUserId,
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
	],
	handlers,
};
