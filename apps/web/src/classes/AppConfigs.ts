import { merge } from "lodash";

import { DrawerAnchor, TransitionName } from "../../../../packages/classes/src";
import { storage } from "./Storage";

export type Protocol = "http" | "https";

export type Url = `${Protocol}://${string}`;

export interface Environments {
	NEXT_PUBLIC_CLIENT_BASE_URL: Url;
	NEXT_PUBLIC_RUNTIME_MODE: "development" | "production";
	NEXT_PUBLIC_SERVER_BASE_URL: Url;
}

export type EnvName = keyof Environments;

export type RuntimeMode = Environments["NEXT_PUBLIC_RUNTIME_MODE"];

type BaseUrl = {
	[key in RuntimeMode]: Url | string;
};

export interface UiConfig {
	dialogDefaultTransition: TransitionName;
	drawerDefaultAnchor: DrawerAnchor;
	maxNotification: number;
}

//TODO: Merge with ConfigManager
export class AppConfigs {
	private RUNTIME_MODE = process.env.NEXT_PUBLIC_RUNTIME_MODE as RuntimeMode;

	private CLIENT_BASE_URLS: BaseUrl = {
		development: process.env.NEXT_PUBLIC_CLIENT_BASE_URL!,
		production: process.env.NEXT_PUBLIC_CLIENT_BASE_URL!,
	};
	private SERVER_BASE_URLS: BaseUrl = {
		development: process.env.NEXT_PUBLIC_SERVER_BASE_URL!,
		production: process.env.NEXT_PUBLIC_SERVER_BASE_URL!,
	};

	getDefaultConfigs() {
		return {
			api: {
				defaultTimeout: this.RUNTIME_MODE === "development" ? 1000 : 0,
				clientBaseUrl: this.CLIENT_BASE_URLS[this.RUNTIME_MODE!],
				defaultHeaders: {
					"Content-Type": "application/json",
				},
				requestTimeout: 60000,
				selectedServerUrl: this.getServerBaseUrl(),
				servers: [
					{
						url: this.getServerBaseUrl(),
					},
				] as { url: Url }[],
				shouldCheckInputDataFields: true,
				shouldCheckOutputDataFields: false,
				shouldCheckResponseStatus: true,
				shouldLogFailureResponse: false,
				shouldLogSuccessfulResponse: false,
				shouldValidateStatus: false,
			},
			others: {
				runtimeMode: this.RUNTIME_MODE,
				shouldLogPerformanceMeasuring: false,
			},
			stateManagement: {
				shouldLogActions: false,
			},
			ui: {
				dialogDefaultTransition: "Grow",
				drawerDefaultAnchor: "left",
				maxNotification: 10,
			} as UiConfig,
		};
	}

	private getServerBaseUrl(): Url {
		if (this.RUNTIME_MODE === "development")
			return this.SERVER_BASE_URLS.development as Url;

		return this.SERVER_BASE_URLS.production as Url;
	}

	getConfigs() {
		const _defaultConfigs = this.getDefaultConfigs();
		type Configs = typeof _defaultConfigs;

		const oldConfigs = storage.get("configs") || "{}";
		return merge(JSON.parse(oldConfigs), this.getDefaultConfigs()) as Configs;
	}

	addServerUrl(url: Url) {
		const configs = this.getConfigs();
		configs.api.servers.push({ url });
		storage.set("configs", configs);
	}

	updateSelectedServer(url: Url) {
		const configs = this.getConfigs();
		configs.api.selectedServerUrl = url;
		this.updateConfigs(configs);
	}

	private updateConfigs(configs: object) {
		storage.set("configs", configs);
	}

	setDebugLevel() {}
}

export const appConfigs = new AppConfigs();
