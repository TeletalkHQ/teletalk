import { IOName, socketEvents } from "@repo/schema";
import { SocketRoute } from "@repo/socket";
import { Cellphone, FullName } from "@repo/types";
import { Socket } from "socket.io-client";

import { randomMaker } from "@/classes/RandomMaker";
import { RequesterMaker } from "@/types";

import { requesterMaker } from "../classes/Requester";

export const requesterMakerHelper = <T extends IOName>(ioName: T) => {
	const event = socketEvents.find(
		(i) => i.schema.ioName === ioName
	) as unknown as SocketRoute<T>;

	return (socket: Socket) => {
		return requesterMaker(socket, event);
	};
};

export const setupRequester = async <T extends IOName>(
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
	addContactWithCellphone: requesterMakerHelper("addContactWithCellphone"),
	blockUser: requesterMakerHelper("addBlock"),
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
	removeBlock: requesterMakerHelper("removeBlock"),
	removeContact: requesterMakerHelper("removeContact"),
	sendMessage: requesterMakerHelper("sendMessage"),
	signIn: requesterMakerHelper("signIn"),
	updateAvatar: requesterMakerHelper("updateAvatar"),
	updateContact: requesterMakerHelper("updateContact"),
	updatePublicData: requesterMakerHelper("updatePublicData"),
	verify: requesterMakerHelper("verify"),
};
