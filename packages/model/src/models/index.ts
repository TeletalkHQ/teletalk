import { databaseModels } from "./database";
import { nativeModels } from "./native";

export const models = {
	database: databaseModels,
	native: nativeModels,
};

export type * from "./database";
export type * from "./native";
