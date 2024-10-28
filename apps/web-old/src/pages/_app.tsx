import createCache from "@emotion/cache";
import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

import { appConfigs } from "~/classes/AppConfigs";
import { DevLayout } from "~/layouts/Dev";
import MainLayout from "~/layouts/Main";
import MUIThemeProvider from "~/providers/MUIThemeProvider";
import ReactQueryProvider from "~/providers/ReactQueryProvider";

export interface CustomAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const isBrowser = typeof document !== "undefined";

const createEmotionCache = () => {
	let insertionPoint: HTMLElement | undefined;

	if (isBrowser) {
		const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
			"meta[name='emotion-insertion-point']"
		);
		insertionPoint = emotionInsertionPoint ?? undefined;
	}

	return createCache({ key: "mui-style", insertionPoint });
};

const clientSideEmotionCache = createEmotionCache();

export default function _app(props: CustomAppProps) {
	const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

	return (
		<SnackbarProvider
			dense
			maxSnack={appConfigs.getConfigs().ui.maxNotification}
			preventDuplicate
		>
			<ReactQueryProvider>
				<MUIThemeProvider emotionCache={emotionCache}>
					<DevLayout>
						<MainLayout>
							<Component {...pageProps} />
						</MainLayout>
					</DevLayout>
				</MUIThemeProvider>
				<ReactQueryDevtools />
			</ReactQueryProvider>
		</SnackbarProvider>
	);
}
