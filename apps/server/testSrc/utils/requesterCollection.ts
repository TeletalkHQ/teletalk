import { SocketRoute } from "@repo/hl-types";
import { Cellphone, EventName, FullName } from "@repo/type-store";
import { Socket } from "socket.io-client";

import { events } from "~/socket/events";

import { randomMaker } from "@/classes/RandomMaker";
import { requesterMaker } from "@/classes/Requester";
import { RequesterMaker } from "@/types";

export const requesterMakerHelper = <T extends EventName>(eventName: T) => {
	const event = events.find(
		(i) => i.name === eventName
	) as unknown as SocketRoute<T>;

	return (socket: Socket) => {
		return requesterMaker(socket, event);
	};
};

export const setupRequester = async <T extends EventName>(
	requester: RequesterMaker<T>,
	cellphone?: Cellphone,
	fullName?: FullName
) => {
	const { socket, user } = await randomMaker.e2eUser(cellphone, fullName);
	return {
		requester: requester(socket),
		user,
		socket,
	};
};

export const requesterCollection = {
	addBlock: requesterMakerHelper("addBlock"),
	addContactWithCellphone: requesterMakerHelper("addContactWithCellphone"),
	addContactWithUserId: requesterMakerHelper("addContactWithUserId"),
	createNewUser: requesterMakerHelper("createNewUser"),
	disconnect: requesterMakerHelper("disconnect"),
	getAvatar: requesterMakerHelper("getAvatar"),
	getChatInfo: requesterMakerHelper("getChatInfo"),
	getClientStatus: requesterMakerHelper("getClientStatus"),
	getContacts: requesterMakerHelper("getContacts"),
	getCountries: requesterMakerHelper("getCountries"),
	getOnlineClients: requesterMakerHelper("getOnlineClients"),
	getPrivateChat: requesterMakerHelper("getPrivateChat"),
	getPrivateChats: requesterMakerHelper("getPrivateChats"),
	getPublicData: requesterMakerHelper("getPublicData"),
	getStuff: requesterMakerHelper("getStuff"),
	getUserData: requesterMakerHelper("getUserData"),
	getWelcomeMessage: requesterMakerHelper("getWelcomeMessage"),
	join: requesterMakerHelper("join"),
	logout: requesterMakerHelper("logout"),
	ping: requesterMakerHelper("ping"),
	pong: requesterMakerHelper("pong"),
	removeBlock: requesterMakerHelper("removeBlock"),
	removeContact: requesterMakerHelper("removeContact"),
	sendMessage: requesterMakerHelper("sendMessage"),
	signIn: requesterMakerHelper("signIn"),
	updateAvatar: requesterMakerHelper("updateAvatar"),
	updateContact: requesterMakerHelper("updateContact"),
	updatePublicData: requesterMakerHelper("updatePublicData"),
	verify: requesterMakerHelper("verify"),
};
