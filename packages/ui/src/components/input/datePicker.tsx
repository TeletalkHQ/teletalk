"use client";

import type { FC } from "react";
import React from "react";
import {
	DayPicker as DatePickerBase,
	type DateRange as DateRangeType,
	type DayPickerRangeProps,
} from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props extends DayPickerRangeProps {}

export const DatePicker: FC<Props> = ({ ...rest }) => {
	return <DatePickerBase {...rest} />;
};

export type DateRange = DateRangeType;
