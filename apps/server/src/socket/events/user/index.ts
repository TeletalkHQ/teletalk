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
import { models } from "@repo/validator";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const addBlock = builder
	.create<AddBlockIO>()
	.name("addBlock")
	.inputSchema({
		userId: models.validation.userId,
	})
	.outputSchema({
		blockedUser: {
			type: "object",
			props: {
				userId: models.validation.userId,
			},
		},
	})
	.handler(handlers.addBlock)
	.build();

const addContactWithCellphone = builder
	.create<AddContactWithCellphoneIO>()
	.name("addContactWithCellphone")
	.inputSchema({
		countryCode: models.validation.countryCode,
		countryName: models.validation.countryName,
		phoneNumber: models.validation.phoneNumber,
		firstName: models.validation.firstName,
		lastName: models.validation.lastName,
	})
	.outputSchema({
		newContact: {
			type: "object",
			props: {
				countryCode: models.validation.countryCode,
				countryName: models.validation.countryName,
				phoneNumber: models.validation.phoneNumber,
				firstName: models.validation.firstName,
				lastName: models.validation.lastName,
				userId: models.validation.userId,
			},
		},
	})
	.handler(handlers.addContactWithCellphone)
	.build();

const addContactWithUserId = builder
	.create<AddContactWithUserIdIO>()
	.name("addContactWithUserId")
	.inputSchema({
		firstName: models.validation.firstName,
		lastName: models.validation.lastName,
		userId: models.validation.userId,
	})
	.outputSchema({
		newContact: {
			type: "object",
			props: {
				countryCode: models.validation.countryCode,
				countryName: models.validation.countryName,
				phoneNumber: models.validation.phoneNumber,
				firstName: models.validation.firstName,
				lastName: models.validation.lastName,
				userId: models.validation.userId,
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
		firstName: models.validation.firstName,
		lastName: models.validation.lastName,
		userId: models.validation.userId,
	})
	.outputSchema({
		updatedContact: {
			type: "object",
			props: {
				firstName: models.validation.firstName,
				lastName: models.validation.lastName,
				userId: models.validation.userId,
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
				countryCode: models.validation.countryCode,
				countryName: models.validation.countryName,
				phoneNumber: models.validation.phoneNumber,
				firstName: models.validation.firstName,
				lastName: models.validation.lastName,
				userId: models.validation.userId,
			},
		},
	})
	.handler(handlers.getContacts)
	.build();

const getUserData = builder
	.create<GetUserDataIO>()
	.name("getUserData")
	.outputSchema({
		avatarSrc: models.validation.avatarSrc,
		bio: models.validation.bio,
		blacklist: {
			type: "array",
			items: {
				type: "object",
				userId: models.validation.userId,
			},
		},
		contacts: {
			type: "array",
			items: {
				type: "object",
				countryCode: models.validation.countryCode,
				countryName: models.validation.countryName,
				phoneNumber: models.validation.phoneNumber,
				firstName: models.validation.firstName,
				lastName: models.validation.lastName,
				userId: models.validation.userId,
			},
		},
		countryCode: models.validation.countryCode,
		countryName: models.validation.countryName,
		createdAt: models.validation.createdAt,
		firstName: models.validation.firstName,
		lastName: models.validation.lastName,
		phoneNumber: models.validation.phoneNumber,
		status: models.validation.status,
		userId: models.validation.userId,
		username: models.validation.username,
	})
	.handler(handlers.getUserData)
	.build();

const getClientStatus = builder
	.create<GetClientStatusIO>()
	.name("getClientStatus")
	.inputSchema({
		userId: models.validation.userId,
	})
	.outputSchema({
		isOnline: models.validation.isOnline,
		userId: models.validation.userId,
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
				userId: models.validation.userId,
			},
		},
	})
	.handler(handlers.getOnlineClients)
	.build();

const getPublicData = builder
	.create<GetPublicDataIO>()
	.name("getPublicData")
	.inputSchema({
		userId: models.validation.userId,
	})
	.outputSchema({
		publicData: {
			type: "object",
			props: {
				firstName: models.validation.firstName,
				lastName: models.validation.lastName,
				bio: models.validation.bio,
				userId: models.validation.userId,
				username: models.validation.username,
			},
		},
	})
	.handler(handlers.getPublicData)
	.build();

const removeBlock = builder
	.create<RemoveBlockIO>()
	.name("removeBlock")
	.inputSchema({
		userId: models.validation.userId,
	})
	.outputSchema({
		removedBlock: {
			type: "object",
			props: {
				userId: models.validation.userId,
			},
		},
	})
	.handler(handlers.removeBlock)
	.build();

const removeContact = builder
	.create<RemoveContactIO>()
	.name("removeContact")
	.inputSchema({
		userId: models.validation.userId,
	})
	.outputSchema({
		removedContact: {
			type: "object",
			props: {
				userId: models.validation.userId,
			},
		},
	})
	.handler(handlers.removeContact)
	.build();

const updatePublicData = builder
	.create<UpdatePublicDataIO>()
	.name("updatePublicData")
	.inputSchema({
		firstName: models.validation.firstName,
		lastName: models.validation.lastName,
		bio: models.validation.bio,
		username: models.validation.username,
	})
	.outputSchema({
		publicData: {
			type: "object",
			props: {
				firstName: models.validation.firstName,
				lastName: models.validation.lastName,
				bio: models.validation.bio,
				userId: models.validation.userId,
				username: models.validation.username,
			},
		},
	})
	.handler(handlers.updatePublicData)
	.build();

const getAvatar = builder
	.create<GetAvatarIO>()
	.name("getAvatar")
	.inputSchema({
		userId: models.validation.userId,
	})
	.outputSchema({
		userId: models.validation.userId,
		avatarSrc: models.validation.avatarSrc,
	})
	.handler(handlers.getAvatar)
	.build();

const updateAvatar = builder
	.create<UpdateAvatarIO>()
	.name("updateAvatar")
	.inputSchema({
		avatarSrc: models.validation.avatarSrc,
	})
	.outputSchema({
		userId: models.validation.userId,
		avatarSrc: models.validation.avatarSrc,
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
