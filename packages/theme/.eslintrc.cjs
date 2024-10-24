const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	root: true,
	extends: ["@repo/eslint-config/base.cjs"],
});
