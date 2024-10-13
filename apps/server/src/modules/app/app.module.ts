import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getFullPath, getRequestMethod } from "@repo/schema";

import { SessionIdMiddleware } from "~/middlewares";

import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { SessionModule } from "../session/session.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const createMongoDBModule = () => {
	return TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => {
			const { MONGO } = configService.getConfigs().DB;

			return {
				type: "mongodb",
				url: MONGO.URL,
				database: MONGO.COLLECTION_NAME,
				autoLoadEntities: true,
				// : [__dirname + "/**/*.entity{.ts,.js}"],
				ssl: false,
				useUnifiedTopology: true,
				useNewUrlParser: true,
			};
		},

		inject: [ConfigService],
	});
};

@Module({
	imports: [AuthModule, SessionModule, createMongoDBModule()],
	controllers: [AppController],
	providers: [AppService],
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
