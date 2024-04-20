import { escapeChars } from "~/variables";

const separator =
	"+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+";

export const loggerHelper = {
	makeSeparator(title = "") {
		const titleLength = title.length;
		const fixedSeparator = separator.slice(
			0,
			(separator.length - titleLength) / 2
		);

		return `${fixedSeparator}---${title}---${fixedSeparator}`;
	},
	logStartTestRequest() {
		logger.info(
			`${escapeChars.newLine}${this.makeSeparator("TEST_REQUEST_BEGIN")}`
		);

		return this;
	},
	logRequestDetails(
		options: object,
		requestData: unknown,
		event: object,
		error: unknown
	) {
		logger.info(`${escapeChars.newLine}request details:`, {
			options,
			requestData,
			event,
			error,
		});
		return this;
	},
	logEndTestRequest() {
		logger.info(
			`${escapeChars.newLine}${this.makeSeparator("TEST_REQUEST_END")}`
		);

		return this;
	},

	logSeparator() {
		logger.info(this.makeSeparator());
	},
};
