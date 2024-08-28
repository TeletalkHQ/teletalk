import logLevel from "loglevel";

import { envManager } from "~/classes/EnvironmentManager";
import { NodeEnvValue } from "~/types";

interface Configs {
	APP: {
		ENVIRONMENT: NodeEnvValue;
		HOSTNAME: "localhost";
		LOG_ENVS: boolean | `${boolean}`;
		PORT: number | string;
		SELF_EXEC: boolean;
		SESSION_SECRET: string;
		USE_CLUSTERS: boolean | `${boolean}`;
	};
	DB: {
		MONGO_URI: string;
		REDIS_HOST: string;
		REDIS_PASSWORD: string;
		REDIS_PORT: number | string;
	};
	SMS_CLIENT: {
		SMS_PROVIDER_1_HOST: string;
		SMS_PROVIDER_1_ROUTE: string;
		SMS_PROVIDER_1_SENDER: string;
		SMS_PROVIDER_1_SESSION: string;
		SMS_PROVIDER_2_HOST: string;
		SMS_PROVIDER_2_REPORT_URL: string;
		SMS_PROVIDER_2_ROUTE: string;
		SMS_PROVIDER_2_SESSION: string;
		SMS_PROVIDER_SELECTOR: number;
	};
	TEST: {
		RUNNER: "MOCHA" | "JEST";
	};
}

class ConfigManager {
	private configs: Configs;

	constructor() {
		this.setup();
	}

	setPort(port: number) {
		this.configs.APP.PORT = port;
	}

	getConfigs() {
		return this.configs;
	}

	private setup() {
		this.registerCustomGlobals();
		envManager.registerEnvironments("base");

		const NODE_ENV = envManager.getNodeEnv();
		if (NODE_ENV) envManager.registerEnvironments(NODE_ENV);

		this.setupConfigsByEnvs();

		this.setLogLevel();
	}

	private registerCustomGlobals() {
		global.logger = logLevel;
	}

	private setupConfigsByEnvs() {
		const ENVS = envManager.getEnv();

		this.configs = {
			APP: {
				ENVIRONMENT: ENVS.NODE_ENV,
				HOSTNAME: "localhost",
				LOG_ENVS: ENVS.LOG_ENVS,
				PORT: ENVS.CUSTOM_PORT || ENVS.PORT,
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
			SMS_CLIENT: {
				SMS_PROVIDER_1_HOST: ENVS.SMS_PROVIDER_1_HOST,
				SMS_PROVIDER_1_ROUTE: ENVS.SMS_PROVIDER_1_ROUTE,
				SMS_PROVIDER_1_SENDER: ENVS.SMS_PROVIDER_1_SENDER,
				SMS_PROVIDER_1_SESSION: ENVS.SMS_PROVIDER_1_SESSION,
				SMS_PROVIDER_2_HOST: ENVS.SMS_PROVIDER_2_HOST,
				SMS_PROVIDER_2_REPORT_URL: ENVS.SMS_PROVIDER_2_REPORT_URL,
				SMS_PROVIDER_2_ROUTE: ENVS.SMS_PROVIDER_2_ROUTE,
				SMS_PROVIDER_2_SESSION: ENVS.SMS_PROVIDER_2_SESSION,
				SMS_PROVIDER_SELECTOR: ENVS.SMS_PROVIDER_SELECTOR,
			},
			TEST: {
				RUNNER: ENVS.TEST_RUNNER,
			},
		};
	}

	private setLogLevel() {
		logger.enableAll();
	}
}

export const configManager = new ConfigManager();
