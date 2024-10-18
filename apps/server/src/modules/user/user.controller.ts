import { Controller, Get, Req } from "@nestjs/common";
import { getPathname } from "@repo/schema";
import { Request } from "express";

import { GetAPIOutput } from "~/types";

import { ErrorStoreService } from "../error-store/error-store.service";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(
		private userService: UserService,
		private errorStoreService: ErrorStoreService
	) {}

	@Get(getPathname("getUserInfo"))
	async getUserInfo(@Req() req: Request): GetAPIOutput<"getUserInfo"> {
		const userInfo = await this.userService.findBySessionId(req.sessionId);

		if (!userInfo)
			this.errorStoreService.throw(
				"notFound",
				"USER_INFO_NOT_FOUND",
				UserController.name
			);

		return {
			data: userInfo,
		};
	}
}
