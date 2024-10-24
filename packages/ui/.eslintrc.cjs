// eslint-disable-next-line import/no-unused-modules
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	root: true,
	extends: ["@repo/eslint-config/nextjs.cjs"],
});
