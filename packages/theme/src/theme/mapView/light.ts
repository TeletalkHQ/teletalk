import { createTheme } from "@mui/material";

import { MAP_VIEW_BASE_THEME } from "../base";

const { palette } = createTheme({
	palette: {
		error: {
			"600": MAP_VIEW_BASE_THEME.COLORS.PURPLE,
			"700": MAP_VIEW_BASE_THEME.COLORS.BURGUNDY,
			main: MAP_VIEW_BASE_THEME.COLORS.RED,
		},
		grey: {
			"50": MAP_VIEW_BASE_THEME.COLORS.LIGHTGREY,
			"100": MAP_VIEW_BASE_THEME.COLORS.LIGHTGREY,
			"200": MAP_VIEW_BASE_THEME.COLORS.LIGHTGREY,
			"300": MAP_VIEW_BASE_THEME.COLORS.LIGHTGREY,
			"400": MAP_VIEW_BASE_THEME.COLORS.GREY,
			"500": MAP_VIEW_BASE_THEME.COLORS.GREY,
			"600": MAP_VIEW_BASE_THEME.COLORS.GREY,
			"700": MAP_VIEW_BASE_THEME.COLORS.DARK_GREY,
			"800": MAP_VIEW_BASE_THEME.COLORS.DARK_GREY,
			"900": MAP_VIEW_BASE_THEME.COLORS.DARK_GREY,
		},
		mode: "light",
		primary: {
			main: MAP_VIEW_BASE_THEME.COLORS.BLUE,
		},
		secondary: {
			"50": MAP_VIEW_BASE_THEME.COLORS.BLACK,
			"100": MAP_VIEW_BASE_THEME.COLORS.BLACKISH,
			"200": MAP_VIEW_BASE_THEME.COLORS.DARK_GREY,
			"300": MAP_VIEW_BASE_THEME.COLORS.DARK_GREY,
			"400": MAP_VIEW_BASE_THEME.COLORS.GREY,
			"500": MAP_VIEW_BASE_THEME.COLORS.GREY,
			"600": MAP_VIEW_BASE_THEME.COLORS.LIGHTGREY,
			"700": MAP_VIEW_BASE_THEME.COLORS.LIGHTGREY,
			"800": MAP_VIEW_BASE_THEME.COLORS.WHITISH,
			"900": MAP_VIEW_BASE_THEME.COLORS.WHITE,
			main: MAP_VIEW_BASE_THEME.COLORS.GREY,
		},
		success: {
			"100": MAP_VIEW_BASE_THEME.COLORS.GREEN2,
			"200": MAP_VIEW_BASE_THEME.COLORS.GREEN3,
			"500": MAP_VIEW_BASE_THEME.COLORS.GREEN,
			main: MAP_VIEW_BASE_THEME.COLORS.GREEN,
		},
		warning: {
			"400": MAP_VIEW_BASE_THEME.COLORS.YELLOW,
			main: MAP_VIEW_BASE_THEME.COLORS.ORANGE,
		},
	},
});

export const mapViewLight = createTheme({
	palette,
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					borderRadius: "10px",
					padding: "5px",
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: palette.secondary.main,
					color: palette.secondary[800],
					fontSize: "13px",
					fontWeight: "normal",
					lineHeight: "1.2",
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: palette.secondary[800],
					backgroundImage: "none",
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root(props) {
					if (props.ownerState.variant === "caption") {
						return {
							fontSize: "14px",
							lineHeight: "20px",
							color: palette.secondary[500],
						};
					} else {
						return {
							color: palette.secondary[500],
						};
					}
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: "none",
					color: palette.secondary.main,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "24px",
					fontSize: "14px",
					padding: "8px 16px",
					textTransform: "none",
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
		MuiOutlinedInput: {
			defaultProps: {
				size: "small",
				style: {
					backgroundColor: palette.secondary[700],
					borderRadius: "24px",
					color: palette.secondary[200],
				},
			},
			styleOverrides: {
				notchedOutline: {
					border: "transparent",
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					"::after": {
						borderTop: `thin solid ${palette.secondary.main}`,
					},
					"::before": {
						borderTop: `thin solid ${palette.secondary.main}`,
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					backgroundColor: palette.secondary[700],
					borderRadius: "25px",
					height: "30px",
					width: "100px",
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					backgroundColor: palette.secondary[700],
					borderRadius: "15px",
					marginTop: "5px",
				},
				list: {
					borderRadius: "25px",
					color: palette.secondary.main,

					"&& .Mui-selected": {
						backgroundColor: palette.primary.main,
						color: palette.secondary.main,
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: () => ({
					borderRadius: "15px",
					color: palette.secondary[200],
					margin: "2px",
					maxHeight: "30px",
				}),
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					backgroundColor: palette.secondary[800],
					backgroundImage: "none",
					borderRadius: "15px",
					minWidth: "450px",
				},
				paperFullScreen: {
					borderRadius: "0px",
					minWidth: "auto",
					height: "100vh",
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					backgroundColor: palette.secondary[700],
					borderRadius: "24px",
				},
			},
		},
		MuiInputAdornment: {
			styleOverrides: {
				root: {
					color: palette.secondary.main,
				},
			},
		},
	},
	typography: {
		fontFamily: "Inter",
		...MAP_VIEW_BASE_THEME.TYPOGRAPHY.TEXT,
	},
});
