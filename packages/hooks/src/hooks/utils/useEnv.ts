import { z } from "zod";

const nodeEnvSchema = z.enum(["build", "development", "production", "test"]);
const logLevelSchema = z.enum([
	"log",
	"error",
	"warn",
	"debug",
	"verbose",
	"fatal",
]);

const envSchema = z.object({
	// TEST_RUNNER: z.enum(["JEST", "MOCHA"]).optional(),
	NEXT_PUBLIC_CLIENT_BASE_URL: z.string(),
	NEXT_PUBLIC_LOG_LEVEL: logLevelSchema,
	NEXT_PUBLIC_SERVER_BASE_URL: z.string(),
	NODE_ENV: nodeEnvSchema,
});

export const envs = envSchema.parse({
	NEXT_PUBLIC_CLIENT_BASE_URL: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
	NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
	NEXT_PUBLIC_SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
	NODE_ENV: process.env.NODE_ENV,
});

export type Environments = z.infer<typeof envSchema>;

export const useEnv = () => {
	return {
		envs,
	};
};