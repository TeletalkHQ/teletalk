import { evnLoader } from "./configs/env/envLoader.js";

evnLoader();

const env = Object.keys(process.env).reduce((prev, curr) => {
	if (curr.startsWith("NEXT_PUBLIC_")) prev[curr] = process.env[curr];
	return prev;
}, {});

/** @type {import('next').NextConfig} */
const nextConfig = {
	env,

	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					as: "*.js",
					loaders: ["@svgr/webpack"],
				},
			},
		},
	},

	images: {
		remotePatterns: [
			{
				hostname: "flagcdn.com",
			},
		],
	},

	async redirects() {
		return ["/", "/create", "/signIn", "/verify"].map((item) => ({
			destination: "/messenger",
			permanent: false,
			source: item,
		}));
	},

	swcMinify: true,
	transpilePackages: ["@repo/ui"],
};
export default nextConfig;
