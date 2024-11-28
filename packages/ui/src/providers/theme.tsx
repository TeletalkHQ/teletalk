import { CssBaseline, GlobalStyles } from "@mui/material";
import { Theme, ThemeProvider as ThemeProviderMui } from "@mui/material";
import { BaseSchema } from "@repo/schema";
import React, { FC, PropsWithChildren } from "react";

import { useThemeState } from "../hooks";
import { EmotionCacheProvider } from "./emotionCache";

export type Themes = Record<BaseSchema.ThemeName, Theme>;

export type AppName = "dashboard" | "map" | "admin" | "health";

interface Props extends PropsWithChildren {
	appName: AppName;
	forceThemeName?: BaseSchema.ThemeName;
	shouldUseBaseline?: boolean;
	themes: Themes;
}

export const ThemeProvider: FC<Props> = ({
	appName,
	children,
	forceThemeName,
	shouldUseBaseline = true,
	themes,
}) => {
	const { theme } = useThemeState();

	const selectedTheme = themes[forceThemeName || theme];

	// TODO: Remove me pls :)
	const color: Record<AppName, string> = {
		admin: selectedTheme.palette.secondary[600],
		map: selectedTheme.palette.secondary[600],
		dashboard: selectedTheme.palette.secondary[600],
		health: selectedTheme.palette.secondary[600],
	};

	const autofillColor = color[appName];

	return (
		<EmotionCacheProvider options={{ key: "mui" }}>
			<ThemeProviderMui theme={selectedTheme}>
				{shouldUseBaseline && <CssBaseline />}
				{children}
			</ThemeProviderMui>

			<GlobalStyles
				styles={{
					"@-webkit-keyframes autofill": {
						from: {
							backgroundColor: `${autofillColor}`,
						},
					},
					"@-webkit-keyframes autofill-focus": {
						from: {
							backgroundColor: `${autofillColor}`,
						},
					},
					"@-webkit-keyframes autofill-hover": {
						from: {
							backgroundColor: `${autofillColor}`,
						},
					},
					"@-webkit-keyframes autofill-active": {
						from: {
							backgroundColor: `${autofillColor}`,
						},
					},
					"input:-webkit-autofill": {
						WebkitBoxShadow: `0 0 0 30px ${autofillColor} inset !important`,
					},
					"input:-webkit-autofill:hover": {
						WebkitBoxShadow: `0 0 0 30px ${autofillColor} inset !important`,
					},
					"input:-webkit-autofill:focus": {
						WebkitBoxShadow: `0 0 0 30px ${autofillColor} inset !important`,
					},
					"input:-webkit-autofill:active": {
						WebkitBoxShadow: `0 0 0 30px ${autofillColor} inset !important`,
					},
				}}
			/>
		</EmotionCacheProvider>
	);
};
