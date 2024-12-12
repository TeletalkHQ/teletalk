import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
	content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: {},
				secondary: {},
				notification: {},
				// primaryText: "#5C5E64",
				// light: "#F4FAF9",
			},
			boxShadow: {
				// box: "0px 5.5px 12px 0px rgba(0, 0, 0, 0.05)",
				// "secondary-box": "0px 3.5px 5.5px 0px #00000005",
			},
			fontFamily: {
				// body: ["var(--font-inter)"],
				// number: ["var(--font-poppins)"],
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
	important: true,
	plugins: [
		function ({ addUtilities }: PluginAPI) {
			const hideScrollbar = {
				".hide-scrollbar": {
					"&::-webkit-scrollbar": {
						display: "none",
					},
					"-ms-overflow-style": "none",
					"scrollbar-width": "none",
				},
			};
			addUtilities(hideScrollbar);
		},
	],
};

module.exports = config;
