import { FormSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const Name = <Name extends FormSchemaName>(props: Props<Name>) => (
	<FieldWithController hiddenLabel name="name" placeholder="Name" {...props} />
);
