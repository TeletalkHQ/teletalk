import type { SliderProps } from "@mui/material";
import { Slider as SliderMui } from "@mui/material";
import type { FC } from "react";

export const Slider: FC<SliderProps> = ({ ...rest }) => {
	return <SliderMui {...rest} />;
};
