// eslint-disable-next-line @typescript-eslint/no-require-imports
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	root: true,
	extends: ["@repo/eslint-config/nextjs.cjs"],
});
