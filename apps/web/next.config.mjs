/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "flagcdn.com",
				pathname: "/w20/**.png",
				protocol: "https",
			},
		],
	},
};

// export default withBundleAnalyzer({
// 	// enabled: process.env.ANALYZE === "true",
// 	enabled: true,
// })(nextConfig);

export default nextConfig;

// export default nextConfig;

// const env = Object.keys(process.env).reduce((prev, curr) => {
// 	if (curr.startsWith("NEXT_PUBLIC_")) prev[curr] = process.env[curr];
// 	return prev;
// }, {});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	env,

// 	experimental: {
// 		turbo: {
// 			rules: {
// 				"*.svg": {
// 					as: "*.js",
// 					loaders: ["@svgr/webpack"],
// 				},
// 			},
// 		},
// 	},

// 	images: {
// 		remotePatterns: [
// 			{
// 				hostname: "flagcdn.com",
// 			},
// 		],
// 	},

// 	async redirects() {
// 		return ["/", "/create", "/signIn", "/verify"].map((item) => ({
// 			destination: "/messenger",
// 			permanent: false,
// 			source: item,
// 		}));
// 	},

// 	transpilePackages: ["@repo/ui"],
// };
// export default nextConfig;
