import { NodeEnv, envManager } from "./EnvironmentManager";

interface Configs {
	APP: {
		ENVIRONMENT: NodeEnv;
		HOSTNAME: "localhost";
		PORT: number | string;
		SELF_EXEC: boolean;
		SESSION_SECRET: string;
		USE_CLUSTERS: boolean;
	};
	DB: {
		MONGO_URI: string;
		REDIS_HOST: string;
		REDIS_PASSWORD: string;
		REDIS_PORT: number | string;
	};
	SMS_CLIENT: {};
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
		envManager.registerEnvs("base");

		const NODE_ENV = envManager.getNodeEnv();
		envManager.registerEnvs(NODE_ENV);

		this.setupConfigsByEnvs();

		// this.setLogLevel();
	}

	private setupConfigsByEnvs() {
		const ENVS = envManager.getEnvs();

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
			SMS_CLIENT: {},
			TEST: {
				RUNNER: ENVS.TEST_RUNNER,
			},
		};
	}
}

export const configManager = new ConfigManager();
