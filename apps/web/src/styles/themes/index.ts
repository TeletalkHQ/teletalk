import { createTheme } from "@mui/material/styles";

export const nordDark = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#81A1C1",
      dark: "#5E81AC",
      light: "#88C0D0",
    },
    secondary: {
      main: "#D08770",
      dark: "#BF616A",
      light: "#EBCB8B",
    },
    background: {
      default: "#2E3440",
      paper: "#3B4252",
    },
    text: {
      primary: "#ECEFF4",
      secondary: "#D8DEE9",
      disabled: "#4C566A",
    },
    error: {
      main: "#BF616A",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.9rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.8rem",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 16, textTransform: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        colorPrimary: "#fff",
        colorAction: "red",
        colorSecondary: "red",
        root: {
          color: "white",
        },
      },
    },
  },
});

export const nordLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#81A1C1",
      dark: "#5E81AC",
      light: "#88C0D0",
    },
    secondary: {
      main: "#D08770",
      dark: "#BF616A",
      light: "#EBCB8B",
    },
    background: {
      default: "#ECEFF4",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2E3440",
      secondary: "#4C566A",
      disabled: "#B8C2CC",
    },
    error: {
      main: "#BF616A",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "16",
      fontWeight: 500,
    },
    h2: {
      fontSize: "16",
      fontWeight: 500,
    },
    body1: {
      fontSize: "16",
      fontWeight: 400,
    },
    body2: {
      fontSize: "16",
      fontWeight: 400,
    },
    caption: {
      fontSize: "16",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
  },
});
