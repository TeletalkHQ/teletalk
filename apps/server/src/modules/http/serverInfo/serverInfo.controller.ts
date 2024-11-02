import { Controller, Get } from "@nestjs/common";
import { HTTPHandlerReturnType, getPathname, getRootPath } from "@repo/schema";

@Controller(getRootPath("serverInfo"))
export class ServerInfoController {
	@Get(getPathname("ping"))
	async ping(): HTTPHandlerReturnType<"ping"> {
		return {
			data: {
				pong: "pong",
			},
		};
	}
}
