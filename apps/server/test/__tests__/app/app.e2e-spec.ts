import { INestApplication } from "@nestjs/common";
import request from "supertest";

import { appInitializer } from "~/modules/app/app.module";

describe("AppController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		app = await appInitializer();
	});

	it("/auth/sign-in", () => {
		return request(app.getHttpServer())
			.post("/auth/sign-in")
			.send({})
			.expect(201)
			.expect({
				data: {},
			});
	});
});
