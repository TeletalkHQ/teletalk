import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { extractor, randomizer, userUtils } from "@repo/classes";
import { GetInput, getPathname, getRootPath } from "@repo/schema";
import { utils } from "@repo/utils";
import { Request, Response } from "express";

import { COOKIE_NAMES } from "~/constants";
import { GetAPIOutput } from "~/types";
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
		@Body() data: GetInput<"signIn">,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	): GetAPIOutput<"signIn"> {
		const signInCode = utils.stringGenerator();

		const cellphone = extractor.cellphone(data);

		const fullNumber = `+${cellphone.countryCode}${cellphone.phoneNumber}`;

		const host = getHostFromRequest(req);
		if (!host) this.errorStoreService.throw("badRequest", "INVALID_HOST");
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
			data: {
				hello: "!yay",
			},
		};
	}

	@Post(getPathname("verify"))
	async verify(
		@Body() _data: GetInput<"verify">,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	): GetAPIOutput<"verify"> {
		const { sessionId } = req;

		const storedSession = await this.tempSessionStoreService.find(sessionId);

		if (!storedSession)
			this.errorStoreService.throw("unauthorized", "STORED_SESSION_NOT_FOUND");

		const user = await this.userService.findOne(
			extractor.cellphone(storedSession)
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
		@Body() data: GetInput<"createNewUser">
	): GetAPIOutput<"createNewUser"> {
		const { firstName, lastName } = data;

		const storedSession = await this.tempSessionStoreService.find(
			req.sessionId
		);
		if (!storedSession)
			this.errorStoreService.throw("unauthorized", "SESSION_NOT_FOUND");

		if (!storedSession.isVerified)
			this.errorStoreService.throw("unauthorized", "SESSION_NOT_VERIFIED");

		const sessionId = this.sessionService.generateSessionId();
		const session = await this.sessionService.sign(sessionId);
		//TODO: Move to another service
		res.cookie(COOKIE_NAMES.SESSION, session, {
			httpOnly: true,
			maxAge: 60 * 1000 * 60 * 24 * 3,
		});

		const cellphone = extractor.cellphone(storedSession);
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
	async logout(@Req() req: Request): GetAPIOutput<"logout"> {
		const foundUser = await this.userService.findBySessionId(req.sessionId);

		if (!foundUser)
			this.errorStoreService.throw("notFound", "USER_BY_SESSION_ID_NOT_FOUND");

		const foundSession = foundUser.sessions.find(
			(item) => item.sessionId === req.sessionId
		);

		if (!foundSession)
			this.errorStoreService.throw(
				"notFound",
				"SESSION_NOT_FOUND_BY_SESSION_ID"
			);

		// foundSession.isExpired = true;

		await this.userService.update({ userId: foundUser.userId }, foundUser);

		return {
			data: undefined,
		};
	}

	// @Get()
	// isAuthenticated(): boolean {
	// 	return false;
	// }
}
