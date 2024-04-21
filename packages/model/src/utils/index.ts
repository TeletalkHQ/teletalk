import { utils as pkgUtils } from "@repo/utility-store";

import { Field, ModelErrorReason, NativeModelKey } from "../types";

const makeModelErrorReason = (
	fieldName: Field,
	modelKeyName: NativeModelKey
) => {
	return `${pkgUtils.makeScreamingSnakeCase(fieldName)}_${pkgUtils.makeScreamingSnakeCase(
		modelKeyName
	)}_ERROR` as ModelErrorReason;
};

export const utils = {
	makeModelErrorReason,
};
