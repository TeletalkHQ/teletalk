import { createTheme } from "@mui/material";

import { DASHBOARD_BASE_THEME } from "../base";

export const dashboardDark = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: DASHBOARD_BASE_THEME.COLORS["006"],
		},
		secondary: {
			main: DASHBOARD_BASE_THEME.COLORS["016"],
		},
		background: {
			default: DASHBOARD_BASE_THEME.COLORS["003"],
			paper: DASHBOARD_BASE_THEME.COLORS["005"],
		},
		text: {
			primary: DASHBOARD_BASE_THEME.COLORS["010"],
			secondary: DASHBOARD_BASE_THEME.COLORS["014"],
		},
	},
	shape: {
		borderRadius: 4,
	},
	spacing: 8,
	components: {
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
					backgroundColor: `rgba(${DASHBOARD_BASE_THEME.COLORS["017"]},0.3)`,
					color: DASHBOARD_BASE_THEME.COLORS["017"],
					fontSize: "12px",
					fontWeight: "lighter",
					lineHeight: "1.2",
					border: `1px solid ${DASHBOARD_BASE_THEME.COLORS["017"]}`,
					backdropFilter: "blur(2px)",
					boxShadow: "4px 4px 4px 0px #00000025",
				},
			},
		},
		MuiButtonGroup: {
			styleOverrides: {
				root: () => ({
					size: "small",
				}),
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: () => ({
					size: "small",
				}),
			},
		},
		MuiFab: {
			styleOverrides: {
				root: () => ({
					size: "small",
				}),
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: () => ({
					margin: "dense",
					size: "small",
				}),
			},
		},

		MuiFormHelperText: {
			styleOverrides: {
				root: () => ({
					margin: "dense",
				}),
			},
		},

		MuiIconButton: {
			styleOverrides: {
				root: () => ({
					size: "small",
				}),
			},
		},

		MuiInputBase: {
			styleOverrides: {
				root: () => ({
					margin: "dense",
					":disabled": {
						backGroundColor: DASHBOARD_BASE_THEME.COLORS["007"],
					},
				}),
			},
		},

		MuiInputLabel: {
			styleOverrides: {
				root: () => ({
					margin: "dense",
				}),
			},
		},
		MuiRadio: {
			styleOverrides: {
				root: () => ({
					size: "small",
				}),
			},
		},

		MuiTextField: {
			defaultProps: {
				inputProps: {
					style: {
						borderRadius: "24px",
						color: DASHBOARD_BASE_THEME.COLORS["017"],
					},
				},
				size: "small",
				style: {
					borderRadius: "24px",
				},
			},
			styleOverrides: {
				root: () => ({
					margin: "dense",
				}),
			},
		},

		MuiButtonBase: {
			styleOverrides: {
				root: () => ({
					disableRipple: true,
				}),
			},
		},

		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: DASHBOARD_BASE_THEME.COLORS["006"],
					backgroundImage: "none",
				},
			},
		},

		MuiTypography: {
			styleOverrides: {
				root(props) {
					if (props.ownerState.variant === "caption")
						return {
							fontSize: "14px",
							lineHeight: "20px",
						};
				},
			},
		},

		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: "none",
					color: DASHBOARD_BASE_THEME.COLORS["017"],
				},
			},
		},

		MuiButton: {
			styleOverrides: {
				root(props) {
					const primaryBorder =
						props.ownerState.style?.border ||
						`1px solid ${DASHBOARD_BASE_THEME.COLORS.BRAND}`;

					const primaryColor =
						props.ownerState.color || DASHBOARD_BASE_THEME.COLORS["017"];

					return {
						backgroundColor:
							props.ownerState.variant === "contained"
								? DASHBOARD_BASE_THEME.COLORS["006"]
								: undefined,
						border:
							props.ownerState.color === "primary" ? primaryBorder : undefined,
						borderRadius: "24px",
						color:
							props.ownerState.color === "primary"
								? primaryColor
								: props.ownerState.color,
						fontSize: "14px",
						padding: "8px 16px",
						size: "small",
						textTransform: "none",
					};
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
			styleOverrides: {
				notchedOutline: {
					border: "transparent",
				},
			},
			defaultProps: {
				size: "small",
				style: {
					borderRadius: "24px",
					backgroundColor: DASHBOARD_BASE_THEME.COLORS["006"],
					boxShadow:
						"inset -1px -1px 1px 0px rgba(88,88,88,0.25),inset 2px 2px 2px 0px rgba(0, 0, 0, 0.25)",
					color: `${DASHBOARD_BASE_THEME.COLORS["003"]} !important`,
				},
			},
		},

		MuiDivider: {
			styleOverrides: {
				root: {
					"::after": {
						borderTop: "thin solid gray",
					},
					"::before": {
						borderTop: "thin solid gray",
					},
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				root: () => ({
					width: 42,
					height: 26,
					padding: 0,
					margin: 8,
				}),
				switchBase: () => ({
					padding: 1,
					"&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
						transform: "translateX(16px)",
						color: DASHBOARD_BASE_THEME.COLORS["017"],
						"& + $track": {
							opacity: 1,
							border: "none",
						},
					},
				}),
				thumb: {
					width: 24,
					height: 24,
				},
				track: {
					borderRadius: 13,
					border: `1px solid ${DASHBOARD_BASE_THEME.COLORS["012"]}`,
					backgroundColor: DASHBOARD_BASE_THEME.COLORS["017"],
					opacity: 1,
					transition:
						"background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
				},
			},
		},
		MuiTable: {
			styleOverrides: {},
			defaultProps: {
				sx: {
					"& th > *": {
						border: "none",
						outline: "none",
					},
				},
			},
		},
	},

	typography: {
		body1: {
			fontSize: 12,
			letterSpacing: "0.03em",
			lineHeight: 1.2,
		},
		body2: {
			fontSize: 8,
			fontWeight: 300,
			letterSpacing: "0.07em",
			lineHeight: 1,
		},
		button: {
			fontSize: 12,
			fontWeight: 500,
			lineHeight: 1,
		},
		caption: {
			fontSize: 8,
			lineHeight: 1.2,
		},
		fontSize: 8,
		fontWeightBold: 300,
		fontWeightMedium: 300,
		fontWeightRegular: 300,
		h6: {
			fontSize: 14,
			fontWeight: 400,
			letterSpacing: "0.06em",
			lineHeight: 1.5,
		},
		htmlFontSize: 14,
	},
});
