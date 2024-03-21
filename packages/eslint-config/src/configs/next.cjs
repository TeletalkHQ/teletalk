const { defineConfig } = require("eslint-define-config");

const baseConfig = require("./base.cjs");

const nextConfig = defineConfig({
	...baseConfig,
	env: {
		...baseConfig.env,
		browser: true,
	},
	extends: [
		...baseConfig.extends,
		"eslint-config-turbo",
		"next",
		"next/core-web-vitals",
		"plugin:react-hooks/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react/recommended",
		require.resolve("@vercel/style-guide/eslint/next"),
	],
	globals: {
		...baseConfig.globals,
		Atomics: "readonly",
		GeolocationPosition: true,
		GeolocationPositionError: true,
		JSX: true,
		React: true,
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		...baseConfig.parserOptions,
		ecmaFeatures: {
			...baseConfig.parserOptions.ecmaFeatures,
			jsx: true,
		},
	},
	plugins: [...baseConfig.plugins, "react", "react-hooks"],
	rules: {
		...baseConfig.rules,
		"no-console": "off",
		"react/prop-types": "off",
		"react/jsx-sort-props": [
			"warn",
			{
				callbacksLast: true,
				ignoreCase: true,
				locale: "en",
				noSortAlphabetically: false,
				reservedFirst: ["key"],
			},
		],
	},
});

module.exports = nextConfig;
