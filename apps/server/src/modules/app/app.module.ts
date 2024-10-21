import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_INTERCEPTOR, NestFactory } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { getFullPath, getRequestMethod } from "@repo/schema";
import cookieParser from "cookie-parser";

import { RedisIoAdapter } from "~/classes/RedisIoAdapter";
import { SessionIdMiddleware } from "~/middlewares";
import { WsRateLimitModule } from "~/modules/ws-rate-limit/ws-rate-limit.module";

import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { ErrorStoreModule } from "../error-store/error-store.module";
import { PrivateChatModule } from "../private-chat/private-chat.module";
import { SessionModule } from "../session/session.module";
import { UserModule } from "../user/user.module";
import { AppController } from "./app.controller";
import { AppInterceptor } from "./app.interceptor";
import { AppService } from "./app.service";

const createMongoDBModule = () => {
	return MongooseModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => {
			const { MONGO } = configService.getConfigs().DB;

			return {
				url: MONGO.URL,
				dbName: MONGO.COLLECTION_NAME,
				uri: MONGO.URI,
				ssl: false,
			};
		},

		inject: [ConfigService],
	});
};

@Module({
	controllers: [AppController],
	imports: [
		AuthModule,
		ErrorStoreModule,
		SessionModule,
		UserModule,
		PrivateChatModule,
		WsRateLimitModule,
		createMongoDBModule(),
	],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: AppInterceptor,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(SessionIdMiddleware)
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

export const appInitializer = async (module = AppModule) => {
	const app = await NestFactory.create(module);

	const redisIoAdapter = new RedisIoAdapter(app);
	await redisIoAdapter.connectToRedis();

	app.useWebSocketAdapter(redisIoAdapter);

	app.use(cookieParser());

	await app.listen(getPort());

	return app;
};

const getPort = () => {
	const PORT = Number(process.env.PORT);

	if (isNaN(PORT)) throw Error("UNKNOWN_PORT");

	return PORT;
};
