import { Controller, Get } from "@nestjs/common";
import { countries } from "@repo/assets/countries";
import type { HTTPHandlerReturnType, IOCollection } from "@repo/schema";
import { getPathname, getRootPath } from "@repo/schema";

@Controller(getRootPath("stuff"))
export class StuffController {
	constructor() {}

	@Get(getPathname("getCountries"))
	async getCountries(): HTTPHandlerReturnType<IOCollection["getCountries"]> {
		return {
			data: {
				countries: countries.map((item) => ({ ...item, uuid: "uuid" })),
			},
		};
	}
}
