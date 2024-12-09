import type {
	TypographyProps as MuiTypographyProps } from "@mui/material";
import {
	Typography as MuiTypography
} from "@mui/material";

import { Span } from "../box/span";
import { Tooltip } from "../box/tooltip";
import type { SkeletonProps } from "../loading/skeleton";
import { Skeleton } from "../loading/skeleton";

export interface TypographyProps extends MuiTypographyProps {
	height?: string | number | undefined;
	loading?: boolean;
	loadingProps?: SkeletonProps;
	showTooltip?: boolean;
	width?: string | number | undefined;
}

export const Typography: React.FC<TypographyProps> = ({
	children,
	loading,
	loadingProps,
	showTooltip,
	...rest
}) => {
	if (showTooltip && typeof children !== "string")
		throw Error("When `showTooltip` is true, children must be `string`");

	const component =
		showTooltip && typeof children === "string" ? (
			<Tooltip title={children}>
				<Span>{children}</Span>
			</Tooltip>
		) : (
			children
		);

	return (
		<MuiTypography {...rest}>
			{loading ? <Skeleton {...loadingProps} /> : component}
		</MuiTypography>
	);
};
