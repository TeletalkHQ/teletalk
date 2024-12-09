import type { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR, NestFactory } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { getFullPath, getRequestMethod, httpRoutes } from "@repo/schema";
import cookieParser from "cookie-parser";
import cors from "cors";

import { RedisIoAdapter } from "~/classes/RedisIoAdapter";
import { SessionIdMiddleware } from "~/middlewares";
import { WsRateLimitModule } from "~/modules/ws-rate-limit/ws-rate-limit.module";

import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { ErrorStoreModule } from "../error-store/error-store.module";
import { HTTPModule } from "../http/http.module";
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
				dbName: MONGO.COLLECTION_NAME,
				ssl: false,
				uri: MONGO.URI,
				url: MONGO.URL,
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
		HTTPModule,
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
		const middlewareProxy = consumer.apply(SessionIdMiddleware);

		// TODO: Add `httpRoutesArr`
		Object.values(httpRoutes)
			.filter((item) => item.schema.isAuthRequired === false)
			.forEach((item) => {
				middlewareProxy.exclude({
					method: getRequestMethod(item.schema.ioName),
					path: getFullPath(item.schema.ioName),
				});
			});

		middlewareProxy.forRoutes("*");
	}
}

export const appInitializer = async (module = AppModule) => {
	const app = await NestFactory.create(module);

	const redisIoAdapter = new RedisIoAdapter(app);
	await redisIoAdapter.connectToRedis();

	app.useWebSocketAdapter(redisIoAdapter);

	app.use(cookieParser());

	app.use(
		cors({
			credentials: true,
			origin: true,
		})
	);

	await app.listen(getPort());

	return app;
};

const getPort = () => {
	const PORT = Number(process.env.PORT);

	if (isNaN(PORT)) throw Error("UNKNOWN_PORT");

	return PORT;
};
