/* eslint-disable @typescript-eslint/no-require-imports */
const baseConfig = require("./base.cjs");
const nextJSConfig = require("./next.cjs");
const nodeConfig = require("./node.cjs");

exports.configs = {
	base: baseConfig,
	nextJS: nextJSConfig,
	node: nodeConfig,
};
