/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const { IgnorePlugin } = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** @type { import('webpack').Configuration } */
module.exports = {
	entry: "./src/main",
	externals: {},
	module: {
		rules: [
			// {
			//   exclude: /node_modules/,
			//   test: /\.ts$/,
			//   use: {
			//     loader: 'swc-loader',
			//     options: swcDefaultsFactory().swcOptions,
			//   },
			// },
			{
				test: /\.ts$/,
				loader: "ts-loader",
				// options: {
				// 	transpileOnly: true, // Speeds up builds
				// },
			},
		],
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	output: {
		filename: "[name].cjs",
		path: path.resolve(__dirname, "dist/"),
	},
	plugins: [
		new IgnorePlugin({
			checkResource(resource) {
				const lazyImports = [
					"@fastify/static",
					"@fastify/view",
					"@nestjs/microservices",
					"@nestjs/microservices/microservices-module",
					"@nestjs/platform-express",
					"@nestjs/websockets/socket-module",
					"amqp-connection-manager",
					"amqplib",
					"cache-manager",
					"cache-manager/package.json",
					"class-transformer/storage",
					"hbs",
					"ioredis",
					"kafkajs",
					"mqtt",
					"nats",
				];
				if (!lazyImports.includes(resource)) {
					return false;
				}
				try {
					require.resolve(resource, { paths: [process.cwd()] });
					// eslint-disable-next-line unused-imports/no-unused-vars
				} catch (err) {
					// eslint-disable-next-line no-console
					// console.log("build error:", err);
					return true;
				}
				return false;
			},
		}),
	],
	resolve: {
		extensions: [".js", ".json", ".ts"],
		mainFields: ["main"],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: "tsconfig.json",
			}),
		],
	},
	target: "node",
};