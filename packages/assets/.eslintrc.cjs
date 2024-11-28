// eslint-disable-next-line @typescript-eslint/no-require-imports
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	extends: ["@repo/eslint-config/nextjs.cjs"],
	root: true,
});
