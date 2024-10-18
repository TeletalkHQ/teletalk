import { randomizer } from "@repo/classes";

import { configManager } from "~/classes/ConfigManager";

export const testServerInitializer = async () => {
	const { runner } = await import("~/index");

	configManager.setPort(randomizer.numberWithRange(8000, 50000));

	logger.disableAll();
	logger.setLevel("debug");

	await runner();
};
