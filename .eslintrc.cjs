const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	extends: ["@repo/eslint-config/src/configs/base.cjs"],
	ignorePatterns: ["apps/**", "packages/**"],
	root: true,
});
