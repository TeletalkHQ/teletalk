import { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { expect } from "chai";

import { AppController } from "~/modules/app/app.controller";
import { AppService } from "~/modules/app/app.service";

describe("AppController", () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe("root", () => {
		it("should return Hello World!", () => {
			expect(appController.getHello()).to.be("Hello World!");
		});
	});
});
