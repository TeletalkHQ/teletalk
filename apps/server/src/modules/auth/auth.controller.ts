import { faker } from "@faker-js/faker";
import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { extractor, randomizer, userUtils } from "@repo/classes";
import {
	HTTPHandlerReturnType,
	HTTPRequestBody,
	IOCollection,
	getPathname,
	getRootPath,
} from "@repo/schema";
import { Request, Response } from "express";

import { COOKIE_NAMES } from "~/constants";
import { getHostFromRequest } from "~/utils";

import { ErrorStoreService } from "../error-store/error-store.service";
import { SessionService } from "../session/session.service";
import { SmsService } from "../sms/sms.service";
import { TempSessionStoreService } from "../temp-session-store/temp-session-store.service";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Controller(getRootPath("auth"))
export class AuthController {
	constructor(
		private authService: AuthService,
		private tempSessionStoreService: TempSessionStoreService,
		private sessionService: SessionService,
		private smsService: SmsService,
		private userService: UserService,
		private errorStoreService: ErrorStoreService
	) {}

	@Post(getPathname("signIn"))
	async signIn(
		@Body() data: HTTPRequestBody<IOCollection["signIn"]>,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	): HTTPHandlerReturnType<IOCollection["signIn"]> {
		const signInCode = faker.string.numeric({ length: 6 });

		const cellphone = extractor.cellphone(data);

		const fullNumber = `+${cellphone.countryCode}${cellphone.phoneNumber}`;

		const host = getHostFromRequest(req);
		if (!host)
			this.errorStoreService.throw(
				"badRequest",
				"INVALID_HOST",
				AuthController.name
			);
		await this.smsService.sendSignInCode(fullNumber, host, signInCode);

		const sessionId = this.sessionService.generateSessionId();

		await this.tempSessionStoreService.add(sessionId, {
			...cellphone,
			isVerified: false,
			signInCode,
		});

		const session = await this.sessionService.sign(sessionId);

		res.cookie(COOKIE_NAMES.SESSION, session, {
			httpOnly: true,
			maxAge: 60 * 1000 * 3,
		});

		return {
			data: {},
		};
	}

	@Post(getPathname("verify"))
	async verify(
		@Body() _data: HTTPRequestBody<IOCollection["verify"]>,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	): HTTPHandlerReturnType<IOCollection["verify"]> {
		const { sessionId } = req;

		const tempStoredSession =
			await this.tempSessionStoreService.find(sessionId);

		if (!tempStoredSession)
			this.errorStoreService.throw(
				"unauthorized",
				"STORED_SESSION_NOT_FOUND",
				AuthController.name
			);

		const user = await this.userService.findOne(
			extractor.cellphone(tempStoredSession)
		);

		if (user) {
			const sessionId = this.sessionService.generateSessionId();

			const session = await this.sessionService.sign(sessionId);
			res.cookie(COOKIE_NAMES.SESSION, session, {
				httpOnly: true,
				maxAge: 60 * 1000 * 60 * 24 * 3,
			});

			await this.userService.addSessionId(user.userId, sessionId);

			await this.tempSessionStoreService.remove(sessionId);

			return {
				data: {
					isNewUser: false,
				},
			};
		}

		return {
			data: {
				isNewUser: true,
			},
		};
	}

	@Post(getPathname("createNewUser"))
	async createNewUser(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@Body() data: HTTPRequestBody<IOCollection["createNewUser"]>
	): HTTPHandlerReturnType<IOCollection["createNewUser"]> {
		const { firstName, lastName } = data;

		const tempStoredSession = await this.tempSessionStoreService.find(
			req.sessionId
		);
		if (!tempStoredSession)
			this.errorStoreService.throw(
				"unauthorized",
				"SESSION_NOT_FOUND",
				AuthController.name
			);

		if (!tempStoredSession.isVerified)
			this.errorStoreService.throw(
				"unauthorized",
				"SESSION_NOT_VERIFIED",
				AuthController.name
			);

		const sessionId = this.sessionService.generateSessionId();
		const session = await this.sessionService.sign(sessionId);
		//TODO: Move to another service
		res.cookie(COOKIE_NAMES.SESSION, session, {
			httpOnly: true,
			maxAge: 60 * 1000 * 60 * 24 * 3,
		});

		const cellphone = extractor.cellphone(tempStoredSession);
		const userId = randomizer.userId();
		await this.userService.create({
			...userUtils.getDefaultUserData(),
			...cellphone,
			createdAt: Date.now(),
			firstName,
			lastName,
			userId,
			sessions: [
				{
					isExpired: false,
					sessionId,
				},
			],
			status: {
				isActive: true,
			},
		});

		await this.tempSessionStoreService.remove(req.sessionId);

		return {
			data: {},
		};
	}

	@Get(getPathname("logout"))
	async logout(
		@Req() req: Request
	): HTTPHandlerReturnType<IOCollection["logout"]> {
		const foundUser = await this.userService.findBySessionId(req.sessionId);

		if (!foundUser)
			this.errorStoreService.throw(
				"notFound",
				"USER_BY_SESSION_ID_NOT_FOUND",
				AuthController.name
			);

		const foundSession = foundUser.sessions.find(
			(item) => item.sessionId === req.sessionId
		);

		if (!foundSession)
			this.errorStoreService.throw(
				"notFound",
				"SESSION_NOT_FOUND_BY_SESSION_ID",
				AuthController.name
			);

		// foundSession.isExpired = true;

		await this.userService.update({ userId: foundUser.userId }, foundUser);

		return {
			data: {},
		};
	}

	// @Get()
	// isAuthenticated(): boolean {
	// 	return false;
	// }
}
