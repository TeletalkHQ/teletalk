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

		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",

		parserOptions: {
			project: "tsconfig.json",
			tsconfigRootDir: __dirname,
			sourceType: "module",
		},
		plugins: ["@typescript-eslint/eslint-plugin"],
		extends: [
			"plugin:@typescript-eslint/recommended",
			"plugin:prettier/recommended",
		],
		root: true,
		env: {
			node: true,
			jest: true,
		},
		ignorePatterns: [".eslintrc.js"],
		rules: {},
	},
});

module.exports = nodeConfig;
