import { z } from "zod";

// const nodeEnvSchema = z.enum(["build", "development", "production", "test"]);
const logLevelSchema = z.enum([
	"log",
	"error",
	"warn",
	"debug",
	"verbose",
	"fatal",
]);

const envSchema = z.object({
	NEXT_PUBLIC_LOG_LEVEL: logLevelSchema,
	// NODE_ENV: nodeEnvSchema,
	// TEST_RUNNER: z.enum(["JEST", "MOCHA"]).optional(),
	NEXT_PUBLIC_CLIENT_BASE_URL: z.string(),
	NEXT_PUBLIC_SERVER_BASE_URL: z.string(),
	NEXT_PUBLIC_RUNTIME_MODE: z.enum(["development", "production"]),
});

export const envs = envSchema.parse(process.env);

export type Environments = z.infer<typeof envSchema>;

export const useEnv = () => {
	return {
		envs,
	};
};
