"use client";

import { createTheme } from "@mui/material";

const { palette } = createTheme({
	palette: {
		mode: "dark",
	},
});

export const webDark = createTheme({
	palette,
	components: {},

	typography: {
		fontFamily: "serif",
	},
});
