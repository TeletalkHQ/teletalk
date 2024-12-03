import { Controller, Get } from "@nestjs/common";
import {
	HTTPHandlerReturnType,
	IOCollection,
	getPathname,
	getRootPath,
} from "@repo/schema";

@Controller(getRootPath("server-info"))
export class ServerInfoController {
	@Get(getPathname("ping"))
	async ping(): HTTPHandlerReturnType<IOCollection["ping"]> {
		return {
			data: {
				pong: "pong",
			},
		};
	}
}
