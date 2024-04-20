import { randomMaker } from "@repo/utility-store";

import { configs } from "~/classes/Configs";

await configs.setup();

export const testServerInitializer = async () => {
	await configs.setup();

	const { runner } = await import("~/index");

	configs.setPort(randomMaker.numberWithRange(8000, 50000));

	logger.disableAll();
	logger.setLevel("debug");

	await runner();
};
