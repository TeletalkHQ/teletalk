import type { FC } from "react";
import type { IconBaseProps, IconType } from "react-icons";

export type IconComponentType = IconType;

export interface DynamicIconProps extends IconBaseProps {
	// color?: string;
	height?: string | number;
	icon: IconComponentType;
	width?: string | number;
}

export const DynamicIcon: FC<DynamicIconProps> = ({
	icon: Icon,
	width = 26,
	height = 26,
	// CLEANME: Replace with COLORS
	color = "#9F9F9F",
	fontSize = 26,
	...rest
}) => {
	return (
		<Icon
			color={color}
			fontSize={fontSize}
			height={height}
			width={width}
			{...rest}
		/>
	);
};
