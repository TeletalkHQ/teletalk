import { Control } from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import { Path, UseFormGetValues, useController } from "react-hook-form";

import { FieldInputBaseProps, TextField } from "./field";

export type FieldWithValidatorProps<Name extends FormSchemaName> =
	FieldInputBaseProps & {
		control: Control<Name>;
	};

export type FieldWithValidatorWithOptionalNameProps<
	Name extends FormSchemaName,
> = Omit<FieldWithValidatorProps<Name>, "name"> & {
	name?: string;
};

export const FieldWithController = <Name extends FormSchemaName>({
	autoComplete,
	control,
	m,
	name,
	...rest
}: FieldWithValidatorProps<Name>) => {
	const { field } = useController({
		control,
		name: name as Path<UseFormGetValues<any>>,
		// name: name as Path<UseFormGetValues<Control<Name>>>,
	});

	return <TextField {...rest} {...field} />;
};
