const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	extends: ["@repo/eslint-config/src/configs/next.cjs"],
	root: true,
});
