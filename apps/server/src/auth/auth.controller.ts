import { Body, Controller, Post } from "@nestjs/common";
import { GetInput, getPathname, getRootPath } from "@repo/schema";

import { AuthService } from "./auth.service";

interface IAuthController {}

@Controller(getRootPath("auth"))
export class AuthController implements IAuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(getPathname("signIn"))
	signIn(@Body() data: GetInput<"signIn">) {}

	@Post(getPathname("verify"))
	verify(@Body() data: GetInput<"verify">) {}

	@Post(getPathname("createNewUser"))
	createNewUser(@Body() data: GetInput<"createNewUser">) {}

	// @Get("is-authenticated")
	// isAuthenticated(): boolean {
	// 	return false;
	// }
}
