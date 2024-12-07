import {
	Typography as MuiTypography,
	TypographyProps as MuiTypographyProps,
} from "@mui/material";

import { Skeleton, SkeletonProps } from "../../common/loading";
import { Span, Tooltip } from "../box";

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
