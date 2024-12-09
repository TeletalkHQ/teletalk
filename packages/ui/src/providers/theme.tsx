import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import {
	type Theme,
	ThemeProvider as ThemeProviderMui,
} from "@mui/material/styles";
import { type BaseSchema } from "@repo/schema";
import React, { type FC, type PropsWithChildren } from "react";

export type Themes = Record<BaseSchema.ThemeName, Theme>;

export type AppName = "web";

interface Props extends PropsWithChildren {
	appName: AppName;
	forceThemeName?: BaseSchema.ThemeName;
	shouldUseBaseline?: boolean;
	themes: Themes;
}

export const ThemeProvider: FC<Props> = ({
	children,
	// forceThemeName,
	shouldUseBaseline = true,
	themes,
}) => {
	// const { theme } = useThemeState();

	// const selectedTheme = themes[forceThemeName || theme];

	return (
		<AppRouterCacheProvider
		// options={{ enableCssLayer: true }}
		>
			<ThemeProviderMui theme={themes.dark}>
				{shouldUseBaseline && <CssBaseline />}
				{children}
			</ThemeProviderMui>
		</AppRouterCacheProvider>
	);
};
