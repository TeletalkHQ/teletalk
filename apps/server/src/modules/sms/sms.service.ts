import { Injectable } from "@nestjs/common";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { escapeChars } from "@repo/assets/src/variables/others/escapeChars";

@Injectable()
export class SmsService {
	logger: Logger;

	constructor() {
		this.logger = new Logger(SmsService.name);
	}

	templates() {
		return {
			signInCode: (signInCode: string, host: string) =>
				`your sign-in code: ${signInCode} ${escapeChars.newLine}${escapeChars.newLine} ${host}
        `,
		};
	}

	async sendSignInCode(sendTo: string, host: string, code: string) {
		try {
			const text = this.templates().signInCode(code, host);

			await this.devProvider(sendTo, text);
		} catch (error) {
			throw {
				...new InternalServerErrorException("SEND_SMS_FAILED"),
				providerError: error,
			};
		}
	}

	private async devProvider(sendTo: string, text: string) {
		this.logger.debug(`sending sign-in code to:${sendTo}`, `text:${text}`);
	}
}
