const COLORS = {
	BLACK: "#000000",
	BLACKISH: "#1c1e24",
	BLUE: "#00a7e1",
	BURGUNDY: "#B70063",
	DARK_GREY: "#393D48",
	GREEN: "#31e077",
	GREEN2: "#7DB36C",
	GREEN3: "#CAD404",
	GREY: "#8f96a0",
	LIGHTGREY: "#d8dce1",
	ORANGE: "#FF9604",
	PURPLE: "#d547ec",
	RED: "#ff5b5b",
	WHITE: "#FFFFFF",
	WHITISH: "#F5F6FA",
	YELLOW: "#ffbc0f",
} as const;

const FONT_SIZE = {
	M: "18px",
	S: "14px",
	XS: "12px",
	XXS: "10px",
} as const;

const FONTS = {
	HELVETICA: "'HelveticaNeueCyr', sans-serif",
	HELVETICA_BOLD: "'HelveticaNeueCyrBold', sans-serif",
	HELVETICA_LIGHT: "'HelveticaNeueCyrLight', sans-serif",
	INTER: "'Inter', sans-serif",
	INTER_BOLD: "'InterBold', sans-serifs",
	INTER_MEDIUM: "'InterMedium', sans-serif",
	INTER_SEMI_BOLD: "'InterSemiBold', sans-serif",
	ROBOTO: "'RobotoMonoRegular', monospace",
	ROBOTO_MEDIUM: "'RobotoMonoMedium', monospace",
} as const;

const baseTypoStyles = {
	fontWeight: 400,
	fontSize: "18px",
	lineHeight: "20px",
};

const greyCaption = {
	color: COLORS.GREY,
};

const textM = {
	...baseTypoStyles,
};

const textMBold = {
	...textM,
	fontWeight: 600,
};

const textS = {
	...baseTypoStyles,
	fontSize: FONT_SIZE.S,
};

const textSBold = {
	...textS,
	fontWeight: 600,
};

const textXs = {
	...baseTypoStyles,
	fontSize: FONT_SIZE.XS,
	fontWeight: 500,
	lineHeight: "16px",
};

const textXXs = {
	...baseTypoStyles,
	fontSize: FONT_SIZE.XXS,
	lineHeight: "12px",
};

const textXXsBold = {
	...textXXs,
	fontWeight: 700,
};

const TEXT = {
	greyCaption,
	m: textM,
	mBold: textMBold,
	s: textS,
	sBold: textSBold,
	xs: textXs,
	xXs: textXXs,
	xXsBold: textXXsBold,
};

const headerBaseStyle = {
	fontFamily: "Inter",
	fontStyle: "normal",
	lineHeight: "28px",
};

const h4 = {
	...headerBaseStyle,
	fontSize: "22px",
	fontWeight: 400,
	textAlign: "center",
	lineHeight: "28px",
};
const h5 = {
	...headerBaseStyle,
	fontWeight: 600,
	textAlign: "center",
	fontSize: "18px",
	lineHeight: "24px",
};

const HEADER = {
	h4,
	h5,
};

export const TYPOGRAPHY = {
	HEADER,
	TEXT,
} as const;

export const MAP_VIEW_BASE_THEME = {
	COLORS,
	FONT_SIZE,
	FONTS,
	TYPOGRAPHY,
};
