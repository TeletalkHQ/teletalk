import { Controller, Get } from "@nestjs/common";
import { countries } from "@repo/constants";
import { HTTPHandlerReturnType, getPathname, getRootPath } from "@repo/schema";

@Controller(getRootPath("stuff"))
export class StuffController {
	constructor() {}

	@Get(getPathname("getCountries"))
	async getCountries(): HTTPHandlerReturnType<"getCountries"> {
		return {
			data: {
				countries: countries.map((item) => ({ ...item, uuid: "uuid" })),
			},
		};
	}
}
