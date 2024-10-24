import { ComponentPropsWithRef, FC } from "react";

import { SVGIcons } from "./icons";

export type IconName = keyof typeof SVGIcons;

export interface Props
	extends Omit<ComponentPropsWithRef<"svg">, "width" | "height" | "color"> {
	color?: string;
	height?: string | number;
	name: IconName;
	width?: string | number;
}

export const DynamicIcon: FC<Props> = ({
	name,
	// width = 24,
	// height = 24,
	//CLEANME: Replace with COLORS
	// color = "#9F9F9F",
	// ...rest
}) => {
	const MatchedIcon = SVGIcons[name];
	if (!MatchedIcon) {
		const message = `The requested icon(${name}) is not defined.`;
		throw Error(message);
	}

	return null;
	// return <MatchedIcon color={color} height={height} width={width} {...rest} />;
};
