"use client";

import { Control } from "@repo/hooks";
import { Path, UseFormGetValues, useController } from "react-hook-form";
import { ZodSchema } from "zod";

import { FieldInputBaseProps, TextField } from "./textField";

export type FieldWithValidatorProps<T extends ZodSchema> =
	FieldInputBaseProps & {
		control: Control<T>;
	};

export type FieldWithValidatorWithOptionalNameProps<T extends ZodSchema> = Omit<
	FieldWithValidatorProps<T>,
	"name"
> & {
	name?: string;
};

export const FieldWithController = <T extends ZodSchema>({
	autoComplete,
	control,
	m,
	name,
	...rest
}: FieldWithValidatorProps<T>) => {
	const { field } = useController({
		control,
		name: name as Path<UseFormGetValues<any>>,
		// name: name as Path<UseFormGetValues<Control<T>>>,
	});

	return <TextField {...rest} {...field} />;
};
