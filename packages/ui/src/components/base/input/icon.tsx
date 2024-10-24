import { useTheme } from "@mui/material";
import { DynamicIcon, Props } from "@repo/assets";
import { FC } from "react";

export const Icon: FC<Props> = (props) => {
	const { palette } = useTheme();

	return <DynamicIcon color={palette.secondary.main} {...props} />;
};
