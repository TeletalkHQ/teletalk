import { errorStore } from "@repo/error-store";
import { models as modelsFromModelPkg } from "@repo/model";
import { SocketOnHandler } from "@repo/socket";
import { models as modelsFromValidatorPkg } from "@repo/validator";

import { events } from "~/socket/eventHandlers";

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
