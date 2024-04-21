import { errorStore } from "@repo/error-store";
import { models as modelsFromModelPkg } from "@repo/model";
import { GetStuffIO } from "@repo/type-store";
import { models as modelsFromValidatorPkg } from "@repo/validator";

import { events } from "~/socket/events";
import { SocketOnHandler } from "~/types";

export const getStuff: SocketOnHandler<GetStuffIO> = (_socket) => {
	const stuff = {
		errors: errorStore.getAll(),
		models: modelsFromModelPkg.native,
		events,
		validationModels: modelsFromValidatorPkg.validation,
	} as GetStuffIO["output"];

	return {
		data: stuff,
	};
};
