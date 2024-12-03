import { Controller, Get, Req } from "@nestjs/common";
import { HTTPHandlerReturnType, IOCollection, getPathname } from "@repo/schema";
import { Request } from "express";

import { ErrorStoreService } from "../error-store/error-store.service";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(
		private userService: UserService,
		private errorStoreService: ErrorStoreService
	) {}

	@Get(getPathname("getUserInfo"))
	async getUserInfo(
		@Req() req: Request
	): HTTPHandlerReturnType<IOCollection["getUserInfo"]> {
		const userInfo = await this.userService.getUserInfo(req.sessionId);

		return {
			data: {
				userInfo,
			},
		};
	}
}
