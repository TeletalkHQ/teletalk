const { config } = require("@swc/core/spack");

module.exports = config({
	entry: {
		server: __dirname + "/src/main.ts",
	},
	output: {
		path: __dirname + "/lib",
	},
	module: {},
});
