import { Box, type BoxProps } from "@mui/material";

export interface FlexProps extends BoxProps {
	ai?: BoxProps["alignItems"];
	col?: boolean;
	fd?: BoxProps["flexDirection"];
	fullHeight?: boolean;
	fullWidth?: boolean;
	jc?: BoxProps["justifyContent"];
	row?: boolean;
}

export const Flex: React.FC<FlexProps> = ({
	ai,
	alignItems,
	col,
	fd,
	flexDirection,
	fullHeight,
	fullWidth,
	height,
	jc,
	justifyContent,
	row,
	style,
	sx,
	width,
	...rest
}) => {
	const boxFlexDirection =
		(row && "row") || (col && "column") || fd || flexDirection || "row";

	const boxJustifyContent = jc || justifyContent || "flex-start";

	const boxAlignItems = ai || alignItems || "flex-start";

	return (
		//@ts-expect-error //BUG  I don't know what the hell is wrong with it
		<Box
			{...rest}
			style={{
				...style,
				alignItems: boxAlignItems,
				display: "flex",
				flexDirection: boxFlexDirection,
				height: fullHeight ? "100%" : style?.height || height,
				justifyContent: boxJustifyContent,
				width: fullWidth ? "100%" : style?.width || width,
			}}
			sx={sx}
		/>
	);
};
