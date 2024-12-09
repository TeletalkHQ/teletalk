import { type JSX } from "react";

import {
	DynamicIcon,
	type DynamicIconProps,
	type MuiIconType,
} from "./dynamicIcon";

export type IconType = "svg" | "mui";

export type IconComponentType = () => JSX.Element;

type IconSchema = {
	Icon: MuiIconType;
	type: IconType;
};

export type GeneratedIcon = React.FC<Omit<DynamicIconProps, "Icon">>;

export const generateIcon = ({ Icon }: IconSchema) => {
	// if (type === "mui")
	return function MuiIcon(p: Omit<DynamicIconProps, "Icon">) {
		return <DynamicIcon Icon={Icon} {...p} />;
	};
};
