import { LoadingButtonProps } from "@mui/lab";
import { SelectProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ChangeEventHandler } from "react";

export type OnInputChange = ChangeEventHandler<
	HTMLInputElement | HTMLTextAreaElement
>;

export type OnSelectOnChange = SelectProps["onChange"];

export type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
	muiName: string;
};

export interface CustomLoadingButtonProps extends LoadingButtonProps {
	loadingIndicatorText?: string;
}
