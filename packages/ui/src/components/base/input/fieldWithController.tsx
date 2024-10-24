import { BaseSchemaName } from "@repo/schema";
import { Path, UseFormGetValues, useController } from "react-hook-form";

import { Field, FieldInputBaseProps } from "./field";

export type FieldWithValidatorProps<Name extends BaseSchemaName> =
	FieldInputBaseProps & {
		control: any;
		// control: Control<Name>;
	};

export type FieldWithValidatorWithOptionalNameProps<
	Name extends BaseSchemaName,
> = Omit<FieldWithValidatorProps<Name>, "name"> & {
	name?: string;
};

export const FieldWithController = <Name extends BaseSchemaName>({
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

	return <Field {...rest} {...field} />;
};
