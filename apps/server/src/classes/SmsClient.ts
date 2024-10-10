import { InternalServerErrorException, Logger } from "@nestjs/common";
import { escapeChars } from "@repo/vars";

export class SmsClient {
	logger: Logger;

	constructor() {
		this.logger = new Logger(SmsClient.name);
	}

	templates() {
		return {
			verificationCode: (verificationCode: string, host: string) =>
				`verification code: ${verificationCode} ${escapeChars.newLine}${escapeChars.newLine} ${host}
        `,
		};
	}

	async sendVerificationCode(
		sendTo: string,
		host: string,
		verificationCode: string
	) {
		try {
			const text = this.templates().verificationCode(verificationCode, host);

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

export const smsClient = new SmsClient();
