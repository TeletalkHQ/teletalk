import { BaseSchema } from "@repo/schema";

import { SessionService } from "~/modules/session/session.service";
import { TempSessionStoreService } from "~/modules/temp-session-store/temp-session-store.service";

import { getServiceInstance } from "@/utils/app";
import { httpHandlerCollection } from "@/utils/httpHandlerCollection";

import { CookieItem, HTTPHandlerResponse } from "./HTTPHandler";

const sessionService = await getServiceInstance(SessionService);
const tempSessionStoreService = await getServiceInstance(
	TempSessionStoreService
);

class AuthHelper {
	private createResponse: HTTPHandlerResponse<"createNewUser">;
	private signInResponse: HTTPHandlerResponse<"signIn">;
	private verifyResponse: HTTPHandlerResponse<"verify">;
	// TODO: Add session as well
	sessionCookie: CookieItem;

	constructor(
		private cellphone: BaseSchema.Cellphone,
		private fullName?: BaseSchema.FullName
	) {}

	async signIn() {
		const handler = httpHandlerCollection.signIn();
		this.signInResponse = await handler.send(this.cellphone);
		this.sessionCookie = handler.getSessionCookie();
		return this;
	}

	async verify() {
		const verifiedSession = await sessionService.verify(
			this.sessionCookie.value
		);
		const sessionId = sessionService.getSessionId(verifiedSession);
		const storedSession = await tempSessionStoreService.find(sessionId);

		if (!storedSession) throw new Error("STORED_SESSION_NOT_FOUND");

		this.verifyResponse = await httpHandlerCollection
			.verify({
				session: this.sessionCookie.value,
			})
			.send({
				signInCode: storedSession.signInCode,
			});

		return this;
	}

	async create() {
		const handler = httpHandlerCollection.createNewUser({
			session: this.sessionCookie.value,
		});

		this.createResponse = await handler.send(
			this.fullName as BaseSchema.FullName
		);

		this.sessionCookie = handler.getSessionCookie();

		return this;
	}

	async createComplete() {
		await this.signIn();
		await this.verify();
		await this.create();
		return this;
	}

	getResponses() {
		return {
			create: this.createResponse,
			signIn: this.signInResponse,
			verify: this.verifyResponse,
		};
	}
}

export const authHelper = (
	cellphone: BaseSchema.Cellphone,
	fullName?: BaseSchema.FullName
) => new AuthHelper(cellphone, fullName);
