import { StringMap } from "@repo/types";

export enum STORAGE_KEY {
	ACCESS_TOKEN = "ACCESS_TOKEN",
	DASHBOARD_LAYOUT = "DASHBOARD_LAYOUT",
	FEATURES = "FEATURES",
	FILTERS = "FILTERS",
	IS_PERMISSION_SET = "IS_PERMISSION_HAS_SET",
	LOCATION_PERMISSION = "LOCATION_PERMISSION",
	NOTIFICATION_PERMISSION = "NOTIFICATION_PERMISSION",
	PARAMS_HISTORY = "PARAMS_HISTORY",
	SHIP_FILTERS = "SHIP_FILTERS",
	SOURCE_FILTERS = "SOURCE_FILTERS",
	THEME = "THEME",
	TOOLBOX_LAYOUT = "TOOLBOX_LAYOUT",
	WIDGETS = "WIDGETS",
}

type StorageKey = keyof typeof STORAGE_KEY;

// TODO: Move to `web` app
export class Storage {
	private storage?: globalThis.Storage;

	constructor() {
		// @ts-ignore
		if (typeof window !== "undefined") this.storage = localStorage;
	}

	get(key: StorageKey, defaultValue?: any) {
		const value = this.storage?.getItem(key);
		try {
			if (value) return JSON.parse(value);
		} catch (error) {
			return value || defaultValue;
		}
	}

	set(
		key: StorageKey,
		value: string | StringMap | Array<string | boolean | number | StringMap>
	) {
		const finalData = typeof value === "object" ? JSON.stringify(value) : value;
		this.storage?.setItem(key, finalData);
	}

	clear() {
		this.storage?.clear();
	}

	remove(key: StorageKey) {
		this.storage?.removeItem(key);
	}

	isInitialized() {
		return !!this.storage;
	}
}

export const storage = new Storage();
