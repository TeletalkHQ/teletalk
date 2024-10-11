import { Body, Controller, Post, Req } from "@nestjs/common";
import { extractor } from "@repo/classes";
import { GetInput, getPathname, getRootPath } from "@repo/schema";
import { utils } from "@repo/utils";

import { smsClient } from "~/classes";

import { AuthService } from "./auth.service";

interface IAuthController {}

@Controller(getRootPath("auth"))
export class AuthController implements IAuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(getPathname("signIn"))
	async signIn(@Body() data: GetInput<"signIn">, @Req() _req: Request) {
		const signInCode = utils.stringGenerator();

		const cellphone = extractor.cellphone(data);

		const fullNumber = `+${cellphone.countryCode}${cellphone.phoneNumber}`;

		//FIXME: Get host from socket
		// const host = getHostFromRequest(req);
		await smsClient.sendSignInCode(fullNumber, "host", signInCode);

		const sessionId = sessionManager.generateSessionId();

		await authSessionStore.add(sessionId, {
			...cellphone,
			isVerified: false,
			signInCode,
		});

		const session = await sessionManager.sign(sessionId);

		return {
			data: "hello",
		};
	}

	@Post(getPathname("verify"))
	async verify(@Body() data: GetInput<"verify">) {}

	@Post(getPathname("createNewUser"))
	async createNewUser(@Body() data: GetInput<"createNewUser">) {}

	// @Get("is-authenticated")
	// isAuthenticated(): boolean {
	// 	return false;
	// }
}
