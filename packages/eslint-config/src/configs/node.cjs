const { defineConfig } = require("eslint-define-config");

const baseConfig = require("./base.cjs");

const nodeConfig = defineConfig({
	...baseConfig,
	env: {
		...baseConfig.env,
		mocha: true,
	},
	globals: {
		...baseConfig.globals,
		NodeJS: true,
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
});

module.exports = nodeConfig;
