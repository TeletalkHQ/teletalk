/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require("eslint-define-config");
const restrictedGlobals = require("eslint-restricted-globals");
require("@rushstack/eslint-patch/modern-module-resolution");

const baseConfig = defineConfig({
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		"eslint-config-turbo",
		"eslint:recommended",
		"plugin:@cspell/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/typescript",
		"plugin:json/recommended",
		"plugin:promise/recommended",
		// TODO: Enable these
		// "plugin:import/errors",
		// "plugin:import/warnings",

		// "plugin:prettier/recommended",
		// "plugin:sonarjs/recommended",
	],
	globals: {
		logger: true,
	},
	ignorePatterns: [
		"!*.d.ts",
		"!.mocharc.js",
		"!.vscode",
		"*.env",
		"*.md",
		"*.sh",
		"*.svg",
		"*.txt",
		"./*-lock.*",
		".git",
		".github",
		".husky",
		".idea",
		".next",
		"build",
		"dist",
		"lib",
		"node_modules",
		"public",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		// TODO: Setup project
		ecmaVersion: "latest",
		requireConfigFile: false,
		sourceType: "module",
	},
	plugins: [
		"@cspell",
		"@typescript-eslint",
		"@typescript-eslint/eslint-plugin",
		"import",
		"promise",
		"sonarjs",
		"unicorn",
		"unused-imports",
	],
	rules: {
		// "security/detect-object-injection": "off",
		"@cspell/spellchecker": [
			"error",
			{
				autoFix: true,
				checkComments: true,
				ignoreImportProperties: false,
			},
		],
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-namespace": 0,
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-redeclare": "error",
		"@typescript-eslint/no-unnecessary-type-constraint": [0],
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-var-requires": [0],
		"arrow-parens": "warn",
		camelcase: [0],
		"comma-dangle": 0,
		"generator-star-spacing": 0,
		"import/no-unresolved": [
			0,
			{
				amd: true,
				commonjs: true,
				esmodule: true,
				ignore: ["type-fest", "@repo/types"],
			},
		],
		"import/no-unused-modules": [
			"off",
			{
				missingExports: true,
				unusedExports: false,
			},
		],
		"linebreak-style": ["error", "unix"],
		"multiline-ternary": 0,
		"no-console": "warn",
		"no-delete-var": "warn",
		"no-mixed-operators": 0,
		"no-mixed-spaces-and-tabs": 0,
		"no-process-exit": "off",
		"no-restricted-globals": ["error"].concat(restrictedGlobals),
		"no-tabs": 0,
		"no-undef": "error",
		"no-unused-expressions": 0,
		"no-unused-vars": "off",
		"@typescript-eslint/no-empty-object-type": "off",
		"no-use-before-define": [
			"error",
			{
				allowNamedExports: false,
				classes: true,
				functions: false,
				variables: false,
			},
		],
		"no-var": "error",
		"object-curly-spacing": ["error", "always"],
		"object-shorthand": ["error", "always"],
		quotes: ["warn", "double"],
		semi: ["error", "always"],
		"sonarjs/cognitive-complexity": 0,
		"sonarjs/max-switch-cases": 0,
		"sonarjs/no-duplicate-string": 0,
		"sonarjs/no-nested-switch": 0,
		"sort-keys": [
			"off",
			"asc",
			{
				caseSensitive: false,
				minKeys: 2,
				natural: false,
			},
		],
		"space-before-function-paren": 0,
		"unused-imports/no-unused-imports": "warn",
		"unused-imports/no-unused-vars": [
			"warn",
			{
				args: "after-used",
				argsIgnorePattern: "^_",
				ignoreRestSiblings: true,
				vars: "all",
				varsIgnorePattern: "^_",
			},
		],
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts"],
		},
	},
});

module.exports = baseConfig;
