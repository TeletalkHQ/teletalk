"use client";

import { type DrawerAnchor, type TransitionName } from "@repo/types";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

import { STORAGE_KEY } from "../../types";

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

export type Protocol = "http" | "https";

export type Url = `${Protocol}://${string}` & ({} & string);

export type EnvName = keyof Environments;

export interface UiConfig {
	dialogDefaultTransition: TransitionName;
	drawerDefaultAnchor: DrawerAnchor;
	maxNotification: number;
}

type Servers = Array<{ url: Url; id: number }>;

export const useConfigs = () => {
	const environment = envs.NODE_ENV;

	const getInitialConfigs = () => ({
		api: {
			baseUrls: {
				http: envs.NEXT_PUBLIC_SERVER_BASE_URL,
				ws: envs.NEXT_PUBLIC_SERVER_BASE_URL,
			},
			requestDelay: envs.NODE_ENV === "development" ? 1000 : 0,
			requestTimeout: 60000,
			selectedServerId: 1,
			servers: [
				{
					url: envs.NEXT_PUBLIC_SERVER_BASE_URL as Url,
					id: 1,
				},
			] satisfies Servers,
			shouldCheckInputDataFields: true,
			shouldCheckOutputDataFields: false,
			shouldCheckResponseStatus: true,
			shouldLogFailureResponse: false,
			shouldLogSuccessfulResponse: false,
			shouldValidateStatus: false,
		},
		others: {
			environment,
			shouldLogPerformanceMeasuring: false,
		},
		stateManagement: {
			shouldLogActions: false,
		},
		app: {
			baseUrl: envs.NEXT_PUBLIC_CLIENT_BASE_URL,
		},
		ui: {
			dialogDefaultTransition: "Grow",
			drawerDefaultAnchor: "left",
			maxNotification: 10,
		} satisfies UiConfig,
	});

	const [configs, setConfigs] = useLocalStorage(
		STORAGE_KEY.CONFIGS,
		getInitialConfigs
	);

	function addServerUrl(url: Url) {
		setConfigs({
			...configs,
			api: {
				...configs.api,
				servers: [...configs.api.servers, { url, id: Math.random() }],
			},
		});
	}

	function updateSelectedServer(id: number) {
		setConfigs({
			...configs,
			api: {
				...configs.api,
				selectedServerId: id,
			},
		});
	}

	function setDebugLevel() {}

	function getApiHTTPBaseUrl() {
		// TODO: Remove assertion
		return configs.api.baseUrls.http;
	}

	function getApiWSBaseUrl() {
		return configs.api.baseUrls.ws;
	}

	function getAppBaseUrl() {
		return configs.app.baseUrl;
	}

	return {
		addServerUrl,
		configs,
		getApiHTTPBaseUrl,
		getApiWSBaseUrl,
		getAppBaseUrl,
		setDebugLevel,
		updateSelectedServer,
	};
};
