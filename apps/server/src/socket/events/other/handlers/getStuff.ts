import { errorStore } from "@repo/error-store";
import { SocketOnHandler } from "@repo/hl-types";
import { models as modelsFromModelPkg } from "@repo/model";
import { models as modelsFromValidatorPkg } from "@repo/validator";

import { events } from "~/socket/events";

export const getStuff: SocketOnHandler<"getStuff"> = (_socket) => {
	return {
		data: {
			errors: errorStore.getAll(),
			models: modelsFromModelPkg.native,
			events,
			validationModels: modelsFromValidatorPkg.validation,
		},
	};
};
