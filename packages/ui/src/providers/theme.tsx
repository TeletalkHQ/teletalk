import { CssBaseline } from "@mui/material";
import { Theme, ThemeProvider as ThemeProviderMui } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { BaseSchema } from "@repo/schema";
import React, { FC, PropsWithChildren } from "react";

import { useThemeState } from "../hooks";

export type Themes = Record<BaseSchema.ThemeName, Theme>;

export type AppName = "dashboard" | "map" | "admin" | "health";

interface Props extends PropsWithChildren {
	appName: AppName;
	forceThemeName?: BaseSchema.ThemeName;
	shouldUseBaseline?: boolean;
	themes: Themes;
}

export const ThemeProvider: FC<Props> = ({
	children,
	forceThemeName,
	shouldUseBaseline = true,
	themes,
}) => {
	const { theme } = useThemeState();

	const selectedTheme = themes[forceThemeName || theme];

	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ThemeProviderMui theme={selectedTheme}>
				{shouldUseBaseline && <CssBaseline />}
				{children}
			</ThemeProviderMui>
		</AppRouterCacheProvider>
	);
};
