const { defineConfig } = require("eslint-define-config");

const baseConfig = require("./base.cjs");

const nodeConfig = defineConfig({
	...baseConfig,
	env: {
		...baseConfig.env,
		mocha: true,
		node: true,
		jest: true,
	},
	globals: {
		...baseConfig.globals,
		NodeJS: true,
	},
	parserOptions: {
		...baseConfig.parserOptions,
		ecmaFeatures: {
			...baseConfig.parserOptions.ecmaFeatures,
		},
	},
	plugins: [
		...baseConfig.plugins,
		"chai-friendly",
		// "security",
	],
	rules: {
		...baseConfig.rules,
		// "security/detect-object-injection": "off",
		// "chai-friendly/no-unused-expressions": 1,
	},
	ignorePatterns: [".eslintrc.js"],
});

module.exports = nodeConfig;
