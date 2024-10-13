import { Injectable } from "@nestjs/common";
import { parseToInt } from "@repo/schema";
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const nodeEnvSchema = z.enum(["build", "development", "production", "test"]);

const envSchema = z.object({
	HOSTNAME: z.string().optional(),
	LOG_LEVEL: z.enum(["log", "error", "warn", "debug", "verbose", "fatal"]),
	MONGO_HOST: z.string(),
	MONGO_PASSWORD: z.string(),
	MONGO_PORT: z.string().transform(parseToInt),
	MONGO_PREFIX: z.string(),
	MONGO_URI: z.string().optional(),
	MONGO_URL: z.string().optional(),
	COLLECTION_NAME: z.string(),
	MONGO_USERNAME: z.string(),
	NODE_ENV: nodeEnvSchema,
	PORT: z.string().transform(parseToInt),
	REDIS_HOST: z.string(),
	REDIS_PASSWORD: z.string().optional(),
	REDIS_PORT: z.string().transform(parseToInt),
	SELF_EXEC: z.string().transform(Boolean).optional(),
	SESSION_SECRET: z.string(),
	TEST_RUNNER: z.enum(["JEST", "MOCHA"]).optional(),
	USE_CLUSTERS: z.string().transform(Boolean),
});

export type Environments = z.infer<typeof envSchema>;

export type NodeEnv = Environments["NODE_ENV"];

export type EnvFileName = NodeEnv | "base";

@Injectable()
export class EnvService {
	private envs: Environments;

	constructor() {
		this.registerEnvs("base");
		const NODE_ENV = nodeEnvSchema.parse(process.env.NODE_ENV);
		this.registerEnvs(NODE_ENV);
		this.envs = envSchema.parse(process.env);
	}

	static registerEnvs() {}

	getEnvs() {
		return this.envs;
	}

	getNodeEnv() {
		return this.getEnvs().NODE_ENV;
	}

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
