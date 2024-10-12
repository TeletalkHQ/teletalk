import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
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
	imports: [AuthModule, createMongoDBModule()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
