import {
	Randomizer as RandomizerMain,
	extractor,
	userUtils,
} from "@repo/classes";
import { BaseSchema } from "@repo/schema";

import { SessionService } from "~/modules/session/session.service";
import { UserService } from "~/modules/user/user.service";

import { getServiceInstance } from "@/utils/app";
import { httpHandlerCollection } from "@/utils/httpHandlerCollection";

import { authHelper } from "./AuthHelper";

interface UserByE2E {
	session: string;
	userInfo: BaseSchema.UserInfo;
}

interface UserByService {
	session: BaseSchema.Session;
	sessionId: BaseSchema.SessionId;
	userInfo: BaseSchema.UserInfo;
}

const sessionService = await getServiceInstance(SessionService);
const userService = await getServiceInstance(UserService);

export class Randomizer extends RandomizerMain {
	constructor() {
		super();
	}

	async userByE2E(
		cellphone = this.unusedCellphone(),
		fullName = this.fullName()
	): Promise<UserByE2E> {
		const ah = authHelper(cellphone, fullName);
		await ah.createComplete();

		const response = await httpHandlerCollection
			.getUserInfo({
				session: ah.getSession(),
			})
			.send(undefined);

		return {
			userInfo: response.data.data,
			session: ah.getSession(),
		};
	}

	async arrayOfUsersByE2E(length: number) {
		const users: UserByE2E[] = [];
		for (let i = 0; i < length; i++) users.push(await this.userByE2E());

		return users;
	}

	arrayOfUsersByE2E_batch(length: number, cellphone?: BaseSchema.Cellphone) {
		const users: Promise<UserByE2E>[] = [];
		for (let i = 0; i < length; i++) users.push(this.userByE2E(cellphone));

		return users;
	}

	async userByService(
		cellphone = this.unusedCellphone(),
		fullName = this.fullName()
	): Promise<UserByService> {
		const sessionId = sessionService.generateSessionId();

		const dbUserData: BaseSchema.DBUserData = {
			...userUtils.getDefaultUserData(),
			...cellphone,
			...fullName,
			userId: this.userId(),
			sessions: [
				{
					sessionId,
					isExpired: false,
				},
			],
		};

		await userService.create(dbUserData);

		return {
			sessionId,
			session: await sessionService.sign(sessionId),
			userInfo: extractor.userData(dbUserData),
		};
	}

	async arrayOfUserByService(length: number) {
		const users: UserByService[] = [];

		for (let i = 0; i < length; i++) users.push(await this.userByService());

		return users;
	}

	arrayOfUserByService_batch(length: number) {
		const users: Promise<UserByService>[] = [];

		for (let i = 0; i < length; i++) users.push(this.userByService());

		return users;
	}

	async sessions(length: number, userId: BaseSchema.UserId) {
		const sessions: BaseSchema.Sessions = [];

		for (let i = 0; i < length; i++) {
			const sessionId = sessionService.generateSessionId();
			await userService.addSessionId(userId, sessionId);

			sessions.push({
				isExpired: false,
				sessionId,
			});
		}

		return sessions;
	}
}

export const randomizer = new Randomizer();
