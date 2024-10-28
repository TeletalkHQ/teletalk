/* eslint-disable turbo/no-undeclared-env-vars */
export type TransitionName = "Grow" | "Slide" | "Zoom";
export type DrawerAnchor = "bottom" | "left" | "right" | "top";

export interface UiConfig {
	DIALOG_DEFAULT_TRANSITION: TransitionName;
	DRAWER_DEFAULT_ANCHOR: DrawerAnchor;
	MAX_NOTIFICATION: number;
}
type Environment = "development" | "production" | "stage";

// REFACTOR: to custom hook
class ConfigManager {
	private configManager = {
		API: {
			AUTH: {
				FACEBOOK_LOGIN_URL: "https://www.facebook.com/v3.3/dialog/oauth",
				FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FB_APP_ID,
				GOOGLE_LOGIN_URL:
					"https://accounts.google.com/o/oauth2/auth/oauthchooseaccount",
			},
			STATION: {
				MAX_SUB_IN_FREE_ACC: 3,
			},
			URLS: {
				HTTP: {
					development:
						// @ts-ignore
						"http://localhost:8090" ||
						process.env.NEXT_PUBLIC_API_HTTP_URL_PRODUCTION, //TODO: Replace with NEXT_PUBLIC_API_URL_DEV
					production: process.env.NEXT_PUBLIC_API_HTTP_URL_PRODUCTION,
					stage: process.env.NEXT_PUBLIC_API_HTTP_URL_STAGE,
				},
				WS: {
					development: process.env.NEXT_PUBLIC_API_WS_URL_DEV,
					production: process.env.NEXT_PUBLIC_API_WS_URL_PRODUCTION,
					stage: process.env.NEXT_PUBLIC_API_WS_URL_STAGE,
				},
			},
		},
		APP: {
			ENVIRONMENT: process.env.NODE_ENV as Environment,
			MAP: {
				BASE_LAYER_URL: process.env.NEXT_PUBLIC_MAP_URL_BASE_LAYER,
				BEARING: {
					DEFAULT: 0,
				},
				BIG_ICON_MIN_ZOOM: 13,
				DEFAULT_CENTER_COORDS: {
					LAT: 51.505,
					LNG: -0.09,
				},
				LABELS_URL: process.env.NEXT_PUBLIC_MAP_URL_LABELS,
				PITCH: {
					DEFAULT: 0,
					MAX: 85,
					MIN: 0,
				},
				// TODO: Add `theme` type
				STYLE_URLS: {
					dark: process.env.NEXT_PUBLIC_MAP_URL_STYLE_DARK,
					monochromeDark: process.env.NEXT_PUBLIC_MAP_URL_STYLE_MONOCHROME_DARK,
					light: process.env.NEXT_PUBLIC_MAP_URL_STYLE_LIGHT,
				},
				THREE_D: {
					MAX_PITCH: 70,
					MIN_PITCH: 50,
					MIN_ZOOM: 15.5,
				},
				ZOOM: {
					DEFAULT: 13,
					MAX: 22,
					MIN: 2,
				},
			},
			URLS: {
				development: process.env.NEXT_PUBLIC_APP_BASE_URL_DEV,
				production: process.env.NEXT_PUBLIC_APP_BASE_URL_PRODUCTION,
				stage: process.env.NEXT_PUBLIC_APP_BASE_URL_STAGE,
			},
		},
		UI: {
			DIALOG_DEFAULT_TRANSITION: "Grow",
			DRAWER_DEFAULT_ANCHOR: "left",
			MAX_NOTIFICATION: 10,
		} as UiConfig,
	};

	getApiHTTPUrl() {
		const cfg = this.getConfigs();
		// TODO: Remove assertion
		return cfg.API.URLS.HTTP[cfg.APP.ENVIRONMENT]!;
	}

	getApiWSUrl() {
		const cfg = this.getConfigs();
		return cfg.API.URLS.WS[cfg.APP.ENVIRONMENT]!;
	}

	getAppUrl() {
		const cfg = this.getConfigs();
		return cfg.APP.URLS[cfg.APP.ENVIRONMENT]!;
	}

	getConfigs() {
		return this.configManager;
	}
}

export const configManager = new ConfigManager();
