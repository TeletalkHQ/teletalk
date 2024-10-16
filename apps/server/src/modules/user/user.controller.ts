import { Controller, Get, NotFoundException, Req } from "@nestjs/common";
import { getPathname } from "@repo/schema";
import { Request } from "express";

import { GetAPIOutput } from "~/types";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	@Get(getPathname("getUserInfo"))
	async getUserInfo(@Req() req: Request): GetAPIOutput<"getUserInfo"> {
		const userInfo = await this.userService.findBySessionId(req.sessionId);

		if (!userInfo) throw new NotFoundException("USER_INFO_NOT_FOUND");

		return {
			data: userInfo,
		};
	}
}
