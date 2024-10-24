import React, { FC } from "react";
import {
	DayPicker as DatePickerBase,
	DateRange as DateRangeType,
	DayPickerRangeProps,
} from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props extends DayPickerRangeProps {}

export const DatePicker: FC<Props> = ({ ...rest }) => {
	return <DatePickerBase {...rest} />;
};

export type DateRange = DateRangeType;
