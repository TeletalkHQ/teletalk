import os from "os";
import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

import tsconfig from "./tsconfig.json";

const maxThreads = os.cpus().length;
const maxWorkers = process.env.USE_CLUSTER ? maxThreads : maxThreads / 2;

let baseOptions: JestConfigWithTsJest = {
	automock: false,
	cache: false,
	clearMocks: false,
	detectLeaks: false,
	detectOpenHandles: false,
	errorOnDeprecated: false,
	extensionsToTreatAsEsm: [".ts"],
	forceExit: true,
	logHeapUsage: false,
	maxWorkers,
	// testRunner: "jest-jasmine2",
	moduleFileExtensions: ["js", "ts", "json", "node"],
	moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
	modulePaths: [tsconfig.compilerOptions.baseUrl],
	resetModules: false,
	setupFiles: ["./configs/jest/jest.setup.ts"],
	setupFilesAfterEnv: ["./configs/jest/setupFileAfterEnv.ts"],
	silent: false,
	skipNodeResolution: false,
	testEnvironment: "node",
	testMatch: ["**/testSrc/**/*.spec.ts"],
	testPathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/lib",
		"<rootDir>/coverage",
		"<rootDir>/.history",
	],
	// testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
	testTimeout: 20000,
	transform: {
		"^.+\\.ts?$": [
			"ts-jest",
			{
				diagnostics: {
					// exclude: ["**"],
				},
				useESM: true,
			},
		],
	},
	transformIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/lib",
		"<rootDir>/coverage",
	],
	verbose: true,
};

const coverageOptions: JestConfigWithTsJest = {
	collectCoverage: true,
	collectCoverageFrom: ["./src/**"],
	coverageThreshold: {
		global: {
			lines: 85,
		},
	},
};

if (process.env.COVERAGE) baseOptions = { ...baseOptions, ...coverageOptions };

export default baseOptions;

// "jest": {
//     "moduleFileExtensions": [
//       "js",
//       "json",
//       "ts"
//     ],
//     "rootDir": "src",
//     "testRegex": ".*\\.spec\\.ts$",
//     "transform": {
//       "^.+\\.(t|j)s$": "ts-jest"
//     },
//     "collectCoverageFrom": [
//       "**/*.(t|j)s"
//     ],
//     "coverageDirectory": "../coverage",
//     "testEnvironment": "node"
//   }
