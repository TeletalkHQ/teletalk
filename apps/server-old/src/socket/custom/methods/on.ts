import {
	CustomOn,
	ResponseCallback,
	SocketHandlerReturnValue,
	SocketResponse,
} from "@repo/types";
import { EventName, StringMap } from "@repo/types";
import { Socket } from "socket.io";

import { services } from "~/services";
import { UnknownError } from "~/types";
import { utils } from "~/utils";

export const registerCustomOn = (socket: Socket) => {
	// eslint-disable-next-line sonarjs/cognitive-complexity
	return function (eventName, handler) {
		socket.on(
			eventName,
			async (data: StringMap, cb?: ResponseCallback<any>): Promise<void> => {
				const responseCallback =
					typeof cb === "function" ? cb : () => undefined;

				try {
					const returnValue = await handler(socket, data);
					const resolvedReturnValue = resolveReturnValue(returnValue);

					// if (eventName !== "getStuff") {
					// 	checkOutputFields(resolvedReturnValue.data);
					// }

					const response = utils.createSuccessResponse(
						eventName,
						resolvedReturnValue.data
					);

					if (resolvedReturnValue.options.shouldEmitReturnValue)
						await emitReturnValue(socket, eventName, response);

					if (resolvedReturnValue.options.shouldCallResponseCallback)
						await responseCallback(response);

					if (resolvedReturnValue.options.shouldEmitToUserRooms) {
						await emitToUserRooms(socket, eventName, response);
					}

					resolvedReturnValue.options.cbAfterEmit();
				} catch (error) {
					catchBlock(
						socket,
						eventName,
						error as UnknownError,
						responseCallback
					);
				}
			}
		);
	} as CustomOn;
};

function resolveReturnValue(returnValue: void | SocketHandlerReturnValue<any>) {
	return {
		data: returnValue?.data || {},
		options: {
			shouldEmitReturnValue:
				returnValue?.options?.shouldEmitReturnValue ?? true,
			shouldCallResponseCallback:
				returnValue?.options?.shouldCallResponseCallback ?? true,
			shouldEmitToUserRooms:
				returnValue?.options?.shouldEmitToUserRooms ?? true,
			cbAfterEmit: returnValue?.options?.cbAfterEmit ?? (() => undefined),
		},
	};
}

// function checkOutputFields(outputData: StringMap) {
// const foundEvent = events.find((item) => item.name === eventName)!;
// checkFields(
// 	outputData,
// 	foundEvent.outputFields,
// 	errors.checkField.output
// );
// }

async function emitReturnValue(
	socket: Socket,
	eventName: EventName,
	response: SocketResponse<any>
) {
	socket.emit(eventName, response);
}

async function emitToUserRooms(
	socket: Socket,
	eventName: EventName,
	response: SocketResponse<any>
) {
	const {
		user: { userId },
	} = await services.user.findBySessionId({
		currentSessionId: socket.sessionId,
	});
	socket.to(userId).emit(eventName, response);
}

const catchBlock = (
	socket: Socket,
	eventName: EventName,
	error: UnknownError,
	responseCallback: ResponseCallback<any>
) => {
	const response: SocketResponse<any> = utils.createFailureResponse(
		eventName,
		error
	);
	logger.error(`customOn:catchBlock:${eventName}`, error);
	responseCallback(response);
	socket.emit("error", response);
};
