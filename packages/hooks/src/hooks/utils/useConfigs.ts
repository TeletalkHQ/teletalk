import { DrawerAnchor, TransitionName } from "@repo/types";
import { useLocalStorage } from "usehooks-ts";

import { STORAGE_KEY } from "../../types";
import { Environments, useEnv } from "./useEnv";

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
	const { envs } = useEnv();

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
		getApiHTTPBaseUrl,
		getApiWSBaseUrl,
		getAppBaseUrl,
		getAppUrl: getAppBaseUrl,
		setDebugLevel,
		updateSelectedServer,
		configs,
	};
};
