import { LoadingButtonProps } from "@mui/lab";
import { SelectChangeEvent, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ElementName } from "@repo/type-store";
import {
	ChangeEvent,
	ChangeEventHandler,
	DetailedHTMLProps,
	HTMLAttributes,
	MouseEvent,
} from "react";

import { VoidNoArgsFn, VoidWithArg } from ".";
import { DialogName } from "./store";

export type DivProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type SpanProps = DetailedHTMLProps<
	HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>;

export type CommonOnClose = VoidNoArgsFn;

export type CommonOnChange = ChangeEventHandler<
	HTMLInputElement | HTMLTextAreaElement
>;

export type CommonSelectChangeEvent = SelectChangeEvent<unknown>;

export type CommonSelectOnChange = VoidWithArg<CommonSelectChangeEvent>;

export type CommonChangeEvent = ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement
>;

export type HTMLProps = HTMLAttributes<HTMLLIElement>;

export type OnChangeValidatorFn = (
	value: any,
	e:
		| {
				target: {
					value: any;
					name: ElementName;
				};
		  }
		| CommonChangeEvent
) => void;

export type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
	muiName: string;
};

export type HTMLDivMouseEvent = MouseEvent<
	HTMLDivElement,
	globalThis.MouseEvent
>;

export type OnDialogClose = VoidWithArg<DialogName>;

export interface CustomLoadingButtonProps extends LoadingButtonProps {
	loadingIndicatorText?: string;
}
