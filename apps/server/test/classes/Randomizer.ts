import { Randomizer as RandomizerMain, userUtils } from "@repo/classes";
import { BaseSchema } from "@repo/schema";
import { Socket } from "socket.io-client";

import { SessionService } from "~/modules/session/session.service";
import { UserService } from "~/modules/user/user.service";

import { getServiceInstance } from "@/utils/app";

interface _UserByE2E {
	user: BaseSchema.UserData;
	socket: Socket;
}

interface ServiceUser {
	user: BaseSchema.UserData;
	sessionId: BaseSchema.SessionId;
}

const sessionService = await getServiceInstance(SessionService);
const userService = await getServiceInstance(UserService);

export class Randomizer extends RandomizerMain {
	constructor() {
		super();
	}

	// async userByE2E(
	// 	cellphone = this.unusedCellphone(),
	// 	fullName = this.fullName()
	// ): Promise<UserByE2E> {
	// 	const ah = authHelper(cellphone, fullName);
	// 	await ah.createComplete();

	// 	const response = await utils.requesterCollection
	// 		.getUserData(ah.getClientSocket())
	// 		.emitFull(undefined);

	// 	return {
	// 		...ah.getResponses().create.data,
	// 		user: response.data.user,
	// 		socket: ah.getClientSocket(),
	// 	};
	// }

	// async arrayOfUsersByE2E(length: number) {
	// 	const users: UserByE2E[] = [];
	// 	for (let i = 0; i < length; i++) users.push(await this.userByE2E());

	// 	return users;
	// }

	// arrayOfUsersByE2E_batch(length: number, cellphone?: BaseSchema.Cellphone) {
	// 	const users: Promise<UserByE2E>[] = [];
	// 	for (let i = 0; i < length; i++) users.push(this.userByE2E(cellphone));

	// 	return users;
	// }

	async userByService(
		cellphone = this.unusedCellphone(),
		fullName = this.fullName()
	): Promise<ServiceUser> {
		const sessionId = sessionService.generateSessionId();

		const userData: BaseSchema.DBUserData = {
			...userUtils.getDefaultUserData(),
			...cellphone,
			...fullName,
			userId: this.userId(),
			sessions: [
				{
					sessionId,
				},
			],
		};

		await userService.create(userData);

		return {
			sessionId,
			user: {
				...userData,
				contacts: [],
			},
		};
	}

	async arrayOfUserByService(length: number) {
		const users: ServiceUser[] = [];

		for (let i = 0; i < length; i++) users.push(await this.userByService());

		return users;
	}

	arrayOfUserByService_batch(length: number) {
		const users: Promise<ServiceUser>[] = [];

		for (let i = 0; i < length; i++) users.push(this.userByService());

		return users;
	}

	// async sockets(length: number, cellphone = this.unusedCellphone()) {
	// 	const sockets = [];

	// 	for (let i = 0; i < length; i++) {
	// 		const ah = authHelper(cellphone);
	// 		await ah.signIn();
	// 		await ah.verify();

	// 		sockets.push({
	// 			socket: ah.getClientSocket(),
	// 		});
	// 	}

	// 	return sockets;
	// }

	async sessions(length: number, userId: BaseSchema.UserId) {
		const sessions: BaseSchema.Sessions = [];

		for (let i = 0; i < length; i++) {
			const sessionId = sessionService.generateSessionId();
			await userService.addSessionId(userId, sessionId);

			sessions.push({
				sessionId,
			});
		}

		return sessions;
	}
}

export const randomizer = new Randomizer();
