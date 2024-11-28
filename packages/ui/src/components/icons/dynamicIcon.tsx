import { SvgIconProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

export type SvgElement = React.FC<React.SVGProps<SVGSVGElement>>;

export type MuiIconProps = SvgIconProps;

export type MuiIconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
	muiName: string;
};

export interface DynamicIconProps extends MuiIconProps {
	// color?: string;
	height?: string | number;
	Icon: MuiIconType;
	width?: string | number;
}

export type IconComponentType = (
	p: DynamicIconProps
) => React.FC<DynamicIconProps>;

export const DynamicIcon: FC<DynamicIconProps> = ({
	Icon,
	width = 24,
	height = 24,
	// CLEANME: Replace with COLORS
	// color = "#9F9F9F",
	...rest
}) => {
	return <Icon height={height} width={width} {...rest} />;
};
