import { Controller, Get, Req } from "@nestjs/common";
import type { HTTPHandlerReturnType, IOCollection } from "@repo/schema";
import { getPathname } from "@repo/schema";
import type { Request } from "express";

import type { ErrorStoreService } from "../error-store/error-store.service";
import type { UserService } from "./user.service";

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
