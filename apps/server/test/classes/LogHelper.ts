import { Logger } from "@nestjs/common";
import { escapeChars } from "@repo/constants";
import {
	EventName,
	EventSchema,
	HTTPRouteName,
	RouteSchema,
} from "@repo/schema";
import { ZodSchema } from "zod";

export class LogHelper {
	logger: Logger;
	separator = Array.from({ length: 75 }).fill("+-").join("");

	constructor() {
		this.logger = new Logger(LogHelper.name);
	}

	makeSeparator(title = "") {
		const titleLength = title.length;
		const fixedSeparator = this.separator.slice(
			0,
			(this.separator.length - titleLength) / 2
		);

		return `${fixedSeparator}---${title}---${fixedSeparator}`;
	}

	logStartTestRequest() {
		this.logger.debug(
			`${escapeChars.newLine}${this.makeSeparator("TEST_REQUEST_BEGIN")}`
		);

		return this;
	}

	logRequestDetails(
		options: object,
		requestData: unknown,
		schema:
			| RouteSchema<HTTPRouteName, ZodSchema, ZodSchema>
			| EventSchema<EventName>,
		error: unknown
	) {
		this.logger.debug(`${escapeChars.newLine}request details:`, {
			options,
			requestData,
			event: schema,
			error,
		});
		return this;
	}

	logEndTestRequest() {
		this.logger.debug(
			`${escapeChars.newLine}${this.makeSeparator("TEST_REQUEST_END")}`
		);

		return this;
	}

	logSeparator() {
		this.logger.debug(this.makeSeparator());
	}
}

export const logHelper = new LogHelper();
