const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	extends: ["@repo/eslint-config/base.cjs"],
	ignorePatterns: ["apps/**", "packages/**"],
	root: true,
});
