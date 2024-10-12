import { Injectable } from "@nestjs/common";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { escapeChars } from "@repo/vars";

@Injectable()
export class SmsClientService {
	logger: Logger;

	constructor() {
		this.logger = new Logger(SmsClientService.name);
	}

	templates() {
		return {
			signInCode: (verificationCode: string, host: string) =>
				`your sign in verification code: ${verificationCode} ${escapeChars.newLine}${escapeChars.newLine} ${host}
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
		this.logger.debug(`verificationCode sending to:${sendTo}`, `text:${text}`);
	}
}
