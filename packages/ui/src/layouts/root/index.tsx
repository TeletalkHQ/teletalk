import { QueryClientProvider } from "@repo/query-client";
import { BaseSchema } from "@repo/schema";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PropsWithChildren, Suspense } from "react";

import { AppName, ThemeProvider, Themes } from "../../providers/theme";
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
	return (
		<>
			{/* <ErrorBoundary
				fallback={<div>Something went wrong</div>}
				onError={logger.log}
			> */}
			<Suspense>
				<NuqsAdapter>
					<QueryClientProvider>
						<ThemeProvider
							appName={appName}
							forceThemeName={forceThemeName}
							shouldUseBaseline={shouldUseBaseline}
							themes={themes}
						>
							{/* <SnackbarProvider
								anchorOrigin={{
									horizontal: "center",
									vertical: "bottom",
								}}
								maxSnack={5}
								preventDuplicate
							/> */}

							<AuthLayout>{children}</AuthLayout>

							<SpeedInsights />
						</ThemeProvider>

						{shouldShowQueryDevtools && (
							<ReactQueryDevtools initialIsOpen={false} />
						)}
					</QueryClientProvider>
				</NuqsAdapter>
			</Suspense>
			{/* </ErrorBoundary> */}
		</>
	);
}
