import { jest } from "@jest/globals";

import { testAppInitializer } from "@/utils/testAppInitializer";

jest.retryTimes(0, {
	logErrorsBeforeRetry: false,
});

await testAppInitializer();
