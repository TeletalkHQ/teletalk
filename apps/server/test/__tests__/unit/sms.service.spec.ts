import { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { expect } from "chai";

import { SmsService } from "~/modules/sms/sms.service";

describe("SmsService", () => {
	let service: SmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SmsService],
		}).compile();

		service = module.get<SmsService>(SmsService);
	});

	it("should be defined", () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(service).not.to.be.undefined;
	});
});
