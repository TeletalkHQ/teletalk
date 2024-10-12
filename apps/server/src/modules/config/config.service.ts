import { Injectable } from "@nestjs/common";

import { EnvService, Environments } from "../env/env.service";

interface Configs {
	APP: {
		ENVIRONMENT: Environments["NODE_ENV"];
		HOSTNAME: Environments["HOSTNAME"];
		PORT: Environments["PORT"];
		SELF_EXEC: Environments["SELF_EXEC"];
		SESSION_SECRET: Environments["SESSION_SECRET"];
		USE_CLUSTERS: Environments["USE_CLUSTERS"];
	};
	DB: {
		MONGO_URI: Environments["MONGO_URI"];
		REDIS_HOST: Environments["REDIS_HOST"];
		REDIS_PASSWORD: Environments["REDIS_PASSWORD"];
		REDIS_PORT: Environments["REDIS_PORT"];
	};
	// SMS_CLIENT: {};
	TEST: {
		RUNNER: Environments["TEST_RUNNER"];
	};
}

@Injectable()
export class ConfigService {
	private configs: Configs;

	constructor(private envManager: EnvService) {
		this.setup();
	}

	setPort(port: number) {
		this.configs.APP.PORT = port;
	}

	getConfigs() {
		return this.configs;
	}

	private setup() {
		const ENVS = this.envManager.getEnvs();

		this.configs = {
			APP: {
				ENVIRONMENT: ENVS.NODE_ENV,
				HOSTNAME: "localhost",
				PORT: ENVS.PORT,
				SELF_EXEC: ENVS.SELF_EXEC,
				SESSION_SECRET: ENVS.SESSION_SECRET,
				USE_CLUSTERS: ENVS.USE_CLUSTERS,
			},
			DB: {
				MONGO_URI: ENVS.MONGO_URI,
				REDIS_HOST: ENVS.REDIS_HOST,
				REDIS_PASSWORD: ENVS.REDIS_PASSWORD,
				REDIS_PORT: ENVS.REDIS_PORT,
			},
			// SMS_CLIENT: {},
			TEST: {
				RUNNER: ENVS.TEST_RUNNER,
			},
		};
	}
}
