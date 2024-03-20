const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	root: true,
	extends: ["@repo/eslint-config/src/configs/next.cjs"],
	env: {
		mocha: true,
	},
});
