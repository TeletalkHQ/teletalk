import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { getFullPath, getRequestMethod } from "@repo/schema";

import { AppModule, appInitializer } from "~/modules/app/app.module";

import { SessionCookieAttacher } from "./session-cookie-attacher.middleware";

@Module({
	imports: [AppModule],
	controllers: [],
	providers: [],
})
export class TestingAppModule implements NestModule {
	// TODO: DUPLICATE
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(SessionCookieAttacher)
			.exclude({
				method: getRequestMethod("signIn"),
				path: getFullPath("signIn"),
			})
			// TODO: Add ping to excludes
			.exclude({
				method: getRequestMethod("getWelcomeMessage"),
				path: getFullPath("getWelcomeMessage"),
			})
			.forRoutes("*");
	}
}

export const testAppInitializer = () => {
	return appInitializer(TestingAppModule);
};
