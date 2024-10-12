import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Req,
} from "@nestjs/common";
import { extractor } from "@repo/classes";
import { GetInput, getPathname, getRootPath } from "@repo/schema";
import { utils } from "@repo/utils";
import { Request } from "express";

import { GetAPIOutput } from "~/types";
import { getHostFromRequest } from "~/utils";

import { SessionStoreService } from "../session-store/session-store.service";
import { SessionService } from "../session/session.service";
import { SmsClientService } from "../sms-client/sms-client.service";
import { AuthService } from "./auth.service";

@Controller(getRootPath("auth"))
export class AuthController {
	constructor(
		private authService: AuthService,
		private sessionStore: SessionStoreService,
		private sessionService: SessionService,
		private smsClientService: SmsClientService
	) {}

	@Post(getPathname("signIn"))
	async signIn(
		@Body() data: GetInput<"signIn">,
		@Req() req: Request
	): GetAPIOutput<"signIn"> {
		const signInCode = utils.stringGenerator();

		const cellphone = extractor.cellphone(data);

		const fullNumber = `+${cellphone.countryCode}${cellphone.phoneNumber}`;

		const host = getHostFromRequest(req);
		if (!host) throw new BadRequestException("INVALID_HOST");
		await this.smsClientService.sendSignInCode(fullNumber, host, signInCode);

		const sessionId = this.sessionService.generateSessionId();

		await this.sessionStore.add(sessionId, {
			...cellphone,
			isVerified: false,
			signInCode,
		});

		const session = await this.sessionService.sign(sessionId);

		return {
			data: {
				session,
			},
		};
	}

	@Post(getPathname("verify"))
	async verify(@Body() _data: GetInput<"verify">) {}

	@Post(getPathname("createNewUser"))
	async createNewUser(@Body() _data: GetInput<"createNewUser">) {}

	// @Get("is-authenticated")
	// isAuthenticated(): boolean {
	// 	return false;
	// }
}
