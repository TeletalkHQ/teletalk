import { models } from "@repo/validator";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const addBlock = builder
	.create<"addBlock">()
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
	.create<"addContactWithCellphone">()
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
	.create<"addContactWithUserId">()
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
	.create<"disconnect">()
	.name("disconnect")
	.noAuth()
	.handler(handlers.disconnect)
	.build();

const updateContact = builder
	.create<"updateContact">()
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
	.create<"getContacts">()
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
	.create<"getUserData">()
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
	.create<"getClientStatus">()
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
	.create<"getOnlineClients">()
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
	.create<"getPublicData">()
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
	.create<"removeBlock">()
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
	.create<"removeContact">()
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
	.create<"updatePublicData">()
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
	.create<"getAvatar">()
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
	.create<"updateAvatar">()
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
