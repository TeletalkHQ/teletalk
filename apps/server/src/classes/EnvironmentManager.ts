import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const envSchema = z.object({
	LOG_LEVEL: z.enum(["log", "error", "warn", "debug", "verbose", "fatal"]),
	MONGO_COLLECTION_NAME: z.string(),
	MONGO_HOST: z.string(),
	MONGO_PASSWORD: z.string(),
	MONGO_PORT: z.number(),
	MONGO_PREFIX: z.string(),
	MONGO_URI: z.string(),
	MONGO_USERNAME: z.string(),
	NODE_ENV: z.enum(["build", "development", "production", "test"]),
	PORT: z.number(),
	REDIS_HOST: z.string(),
	REDIS_PASSWORD: z.string(),
	REDIS_PORT: z.number(),
	SELF_EXEC: z.boolean(),
	SESSION_SECRET: z.string(),
	//TODO: Move to testSrc scope
	TEST_RUNNER: z.enum(["JEST", "MOCHA"]),
	USE_CLUSTERS: z.boolean(),
});

export type Environments = z.infer<typeof envSchema>;

export type NodeEnv = Environments["NODE_ENV"];

export type EnvFileName = NodeEnv | "base";

class EnvironmentManager {
	getEnvs() {
		return envSchema.parse(process.env);
	}

	getNodeEnv() {
		return this.getEnvs().NODE_ENV;
	}

	// TODO: Remove‌‌‌‌‌‌‌
	registerEnvs(fileName: EnvFileName) {
		dotenv.config({
			path: path.join(
				process.cwd(),
				"environments",
				this.resolveEnvFileName(fileName)
			),
			override: true,
		});
	}

	private resolveEnvFileName(fileName: EnvFileName) {
		return `.env.${fileName}`;
	}
}

export const envManager = new EnvironmentManager();
