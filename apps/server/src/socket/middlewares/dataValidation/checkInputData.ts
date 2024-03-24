import { trier } from "simple-trier";

import { events } from "~/socket/events";
import {
	NativeError,
	SocketEvent,
	SocketMiddleware,
	SocketNext,
	StringMap,
	ValidatorFnType,
} from "~/types";

export const checkInputData: SocketMiddleware = async (
	_socket,
	next,
	[name, data]
) => {
	const { inputValidator } = events.find(
		(item) => item.name === name
	) as SocketEvent;

	// eslint-disable-next-line promise/catch-or-return, promise/valid-params
	await trier<void>(checkInputData.name)
		.async()
		.try(tryBlock, inputValidator, data)
		.executeIfNoError(executeIfNoError, next)
		.catch(catchBlock)
		.run();
};

const tryBlock = async (
	inputValidator: ValidatorFnType | undefined,
	data: StringMap
) => {
	if (inputValidator) await inputValidator(data);
};

const executeIfNoError = (_: void, next: SocketNext) => {
	next();
};

const catchBlock = (error: NativeError) => {
	throw {
		...error,
	};
};
