import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

import { appConfigs } from "~/classes/AppConfigs";
import { DevLayout } from "~/layouts/Dev";
import MainLayout from "~/layouts/Main";
import MUIThemeProvider from "~/providers/MUIThemeProvider";
import ReactQueryProvider from "~/providers/ReactQueryProvider";
import { utils } from "~/utils";

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = utils.createEmotionCache();

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
