import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { nordDark } from "~/styles/themes";

interface Props {
  children: React.ReactNode;
  emotionCache: EmotionCache;
}

const MUIThemeProvider: React.FC<Props> = ({ children, emotionCache }) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={nordDark}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MUIThemeProvider;
