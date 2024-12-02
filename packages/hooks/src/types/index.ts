import { DialogStore, LoadingStore } from "@repo/store";

export interface Params {
	bearing: number;
	hash_key?: string;
	lat: number;
	lng: number;
	pitch: number;
	sidebarName?: LoadingStore.SidebarName;
	token?: string;
	uuid?: string;
	zoom: number;
	dialogName?: DialogStore.DialogName;
}

export type ParamKey = keyof Params;

export type ParamsArr = Array<Params>;

export interface ParamsHistory {
	items: ParamsArr;
	currentIndex: number;
}

export enum STORAGE_KEY {
	CONFIGS = "CONFIGS",
	FEATURES = "FEATURES",
	IS_PERMISSION_SET = "IS_PERMISSION_HAS_SET",
	LOCATION_PERMISSION = "LOCATION_PERMISSION",
	NOTIFICATION_PERMISSION = "NOTIFICATION_PERMISSION",
	THEME = "THEME",
}
