import { Body, Controller, Get } from "@nestjs/common";

import { AuthService } from "./auth.service";

interface IAuthController {
	getHello: (data: boolean) => string;
}

@Controller("auth")
export class AuthController implements IAuthController {
	constructor(private readonly appService: AuthService) {}

	@Get("hello2")
	getHello(@Body() data: boolean) {
		console.log(data);

		return "hello";
	}

	@Get("is-authenticated")
	isAuthenticated(): boolean {
		return false;
	}
}
