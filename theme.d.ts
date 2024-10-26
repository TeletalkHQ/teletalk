/* eslint-disable unused-imports/no-unused-imports */
import {
	ButtonPropsVariantOverrides,
	TypographyPropsVariantOverrides,
} from "@mui/material";
import { TypographyVariantsOptions } from "@mui/material/styles";
import { PaletteColor } from "@mui/material/styles/createPalette";
import React from "react";

declare module "@mui/material/styles" {
	interface PaletteColor {
		"50": string;
		"100": string;
		"200": string;
		"300": string;
		"400": string;
		"500": string;
		"600": string;
		"700": string;
		"800": string;
		"900": string;
	}

	interface TypographyVariants {
		greyCaption: React.CSSProperties;
		m: React.CSSProperties;
		mBold: React.CSSProperties;
		s: React.CSSProperties;
		sBold: React.CSSProperties;
		xs: React.CSSProperties;
		xXs: React.CSSProperties;
		xXsBold: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		greyCaption?: React.CSSProperties;
		m?: React.CSSProperties;
		mBold?: React.CSSProperties;
		s?: React.CSSProperties;
		sBold?: React.CSSProperties;
		xs?: React.CSSProperties;
		xXs?: React.CSSProperties;
		xXsBold?: React.CSSProperties;
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		cancel: true;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		greyCaption: true;
		m: true;
		mBold: true;
		s: true;
		sBold: true;
		xs: true;
		xXs: true;
		xXsBold: true;
	}
}
