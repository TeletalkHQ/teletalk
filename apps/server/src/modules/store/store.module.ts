import { Global, Module, OnApplicationShutdown } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { createClient } from "redis";

import { ConfigModule } from "~/modules/config/config.module";
import { ConfigService } from "~/modules/config/config.service";
import { crashServer } from "~/utils";

import { STORE_KEY } from "./store.constants";
import { StoreService } from "./store.service";

@Global()
@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: STORE_KEY,
			useFactory: async (configService: ConfigService) => {
				return await storeInitializer(configService);
			},
			inject: [ConfigService],
		},
		StoreService,
	],
	exports: [StoreService],
})
export class StoreModule implements OnApplicationShutdown {
	constructor(private readonly moduleRef: ModuleRef) {}

	async onApplicationShutdown(_signal?: string): Promise<void> {
		return new Promise<void>((resolve) => {
			const redis = this.moduleRef.get(STORE_KEY);
			redis.quit();
			redis.on("end", () => {
				resolve();
			});
		});
	}
}

const storeInitializer = async (configService: ConfigService) => {
	const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } =
		configService.getConfigs().DB;

	const storage = createClient({
		password: REDIS_PASSWORD,
		socket: {
			host: REDIS_HOST,
			port: REDIS_PORT,
			tls: false,
		},
	});

	storage.on("connect", () =>
		// eslint-disable-next-line no-console
		console.info(`Redis connected to: ${REDIS_HOST}:${REDIS_PORT}`)
	);
	storage.on("error", crashServer);

	await storage.connect();

	return storage;
};
