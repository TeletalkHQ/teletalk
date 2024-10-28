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

export default nextConfig;
