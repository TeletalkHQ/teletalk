import { Injectable } from "@nestjs/common";

import type { EnvService, Environments } from "../env/env.service";

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
		REDIS: {
			HOST: Environments["REDIS_HOST"];
			PASSWORD: Environments["REDIS_PASSWORD"];
			PORT: Environments["REDIS_PORT"];
		};
		MONGO: {
			URI: Environments["MONGO_URI"];
			URL: Environments["MONGO_URL"];
			COLLECTION_NAME: Environments["COLLECTION_NAME"];
		};
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

	getPort() {
		return this.configs.APP.PORT;
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
				REDIS: {
					HOST: ENVS.REDIS_HOST,
					PASSWORD: ENVS.REDIS_PASSWORD,
					PORT: ENVS.REDIS_PORT,
				},
				MONGO: {
					COLLECTION_NAME: ENVS.COLLECTION_NAME,
					URI: ENVS.MONGO_URI,
					URL: ENVS.MONGO_URL,
				},
			},
			// SMS_CLIENT: {},
			TEST: {
				RUNNER: ENVS.TEST_RUNNER,
			},
		};
	}
}
