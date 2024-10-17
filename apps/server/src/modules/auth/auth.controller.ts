import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from "@nestjs/common";
import { extractor, randomMaker, userUtils } from "@repo/classes";
import { GetInput, getPathname, getRootPath } from "@repo/schema";
import { utils } from "@repo/utils";
import { Request, Response } from "express";

import { COOKIE_NAMES } from "~/constants";
import { GetAPIOutput } from "~/types";
import { getHostFromRequest } from "~/utils";

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
		private userService: UserService
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
		if (!host) throw new BadRequestException("INVALID_HOST");
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
			throw new UnauthorizedException("STORED_SESSION_NOT_FOUND");

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
		if (!storedSession) throw new UnauthorizedException("SESSION_NOT_FOUND");

		if (!storedSession.isVerified)
			throw new UnauthorizedException("SESSION_NOT_VERIFIED");

		const sessionId = this.sessionService.generateSessionId();
		const session = await this.sessionService.sign(sessionId);
		//TODO: Move to another service
		res.cookie(COOKIE_NAMES.SESSION, session, {
			httpOnly: true,
			maxAge: 60 * 1000 * 60 * 24 * 3,
		});

		const cellphone = extractor.cellphone(storedSession);
		const userId = randomMaker.userId();
		await this.userService.create({
			...userUtils.getDefaultUserData(),
			...cellphone,
			firstName,
			lastName,
			createdAt: Date.now(),
			userId,
			sessions: [{ sessionId }],
			status: {
				isActive: true,
			},
		});

		await this.tempSessionStoreService.remove(req.sessionId);

		return {
			data: {},
		};
	}

	// @Get("is-authenticated")
	// isAuthenticated(): boolean {
	// 	return false;
	// }
}
