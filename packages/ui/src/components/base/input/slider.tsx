import { Slider as SliderMui, SliderProps } from "@mui/material";
import React from "react";
import { FC } from "react";

export const Slider: FC<SliderProps> = ({ ...rest }) => {
	return <SliderMui {...rest} />;
};
