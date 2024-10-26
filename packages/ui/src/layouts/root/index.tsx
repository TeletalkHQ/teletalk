"use client";

import { useIsMounted } from "@repo/hooks";
import { logger } from "@repo/logger";
import { QueryClientProvider } from "@repo/query-client";
import { BaseSchema } from "@repo/schema";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AppName, ThemeProvider, Themes } from "../../providers";
import { AuthLayout } from "../auth";

interface Props extends PropsWithChildren {
	appName: AppName;
	forceThemeName?: BaseSchema.ThemeName;
	shouldShowQueryDevtools?: boolean;
	shouldUseBaseline: boolean;
	themes: Themes;
}

// eslint-disable-next-line import/no-unused-modules
export function RootLayout({
	appName,
	children,
	forceThemeName,
	shouldShowQueryDevtools,
	shouldUseBaseline,
	themes,
}: Props) {
	const isMounted = useIsMounted();

	return (
		<>
			<ErrorBoundary
				fallback={<div>Something went wrong</div>}
				onError={logger.log}
			>
				<QueryClientProvider>
					<ThemeProvider
						appName={appName}
						forceThemeName={forceThemeName}
						shouldUseBaseline={shouldUseBaseline}
						themes={themes}
					>
						<SnackbarProvider
							anchorOrigin={{
								horizontal: "center",
								vertical: "bottom",
							}}
							maxSnack={5}
							preventDuplicate
						/>

						<AuthLayout>{children}</AuthLayout>

						{isMounted && <SpeedInsights />}
					</ThemeProvider>

					{shouldShowQueryDevtools && (
						<ReactQueryDevtools initialIsOpen={false} />
					)}
				</QueryClientProvider>
			</ErrorBoundary>
		</>
	);
}
