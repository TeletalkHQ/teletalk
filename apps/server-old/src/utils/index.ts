import { EventName, SocketIOCollection } from "@repo/schema";
import {
	SocketMiddleware,
	SocketMiddlewareEvent,
	SocketNext,
	SocketResponse,
} from "@repo/socket";
import generatePassword from "generate-password";
import { Socket } from "socket.io";
import { z } from "zod";

import { envManager } from "~/classes/EnvironmentManager";
import { Environments } from "~/types";

import { databaseUtils } from "./database";
import { middlewareUtils } from "./middleware";

type Url = EventName | EventName[];

type UnknownError = any;

const isEventNameMatch = (url: Url, reqUrl: string) =>
	(Array.isArray(url) && url.some((u) => u === reqUrl)) || url === reqUrl;

const crashServer = (message: unknown) => {
	logger.error(message);
	process.exit(1);
};

interface ExecuteMiddlewaresArgs {
	middlewares: SocketMiddleware<any>[];
	next: SocketNext;
	socket: Socket;
	socketMiddlewareEvent: SocketMiddlewareEvent<any>;
}

const executeMiddlewares = async ({
	middlewares,
	next,
	socket,
	socketMiddlewareEvent,
}: ExecuteMiddlewaresArgs) => {
	for await (const m of middlewares) {
		const result = await m(
			socket,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			() => {},
			socketMiddlewareEvent
		);

		if (result?.ok === false) {
			return;
		}
	}

	next();
};

const logEnvironments = () => logger.debug(sortEnvironments());

const passwordGenerator = (options: generatePassword.GenerateOptions = {}) => {
	return generatePassword.generate({
		exclude: "",
		length: 6,
		lowercase: false,
		numbers: true,
		symbols: false,
		uppercase: false,
		...options,
	});
};

const sortEnvironments = () =>
	Object.entries(envManager.getEnv())
		.map(([prop, value]) => ({ prop, value }))
		.sort((a, b) => a.prop.localeCompare(b.prop))
		.reduce((prevValue, currentValue) => {
			const value = currentValue.value;
			(prevValue as any)[currentValue.prop] = value;

			return prevValue;
		}, {} as Environments);

const extractClientFromCookie = (cookie: string) => {
	const [rawCookie] = cookie.split("; ");
	return rawCookie.split("=")[1];
};

const resolveResponseError = (error: UnknownError) =>
	Array.isArray(error)
		? error
		: typeof error === "object" && "reason" in error!
			? [error]
			: [
					{ custom: [{ reason: "UNKNOWN_ERROR" }] }.custom.find(
						(i) => i.reason === "UNKNOWN_ERROR"
					)!,
				];

//TODO: Add more support like trim and required

const createSuccessResponse = <T extends EventName>(
	eventName: T,
	data: z.infer<SocketIOCollection[T]["output"]>
): SocketResponse<T> => ({
	data,
	errors: [],
	ok: true,
	eventName,
});

const createFailureResponse = <T extends EventName>(
	eventName: EventName,
	errors: UnknownError
): SocketResponse<T> => ({
	data: undefined,
	errors: resolveResponseError(errors),
	eventName,
	ok: false,
});

export const utils = {
	...middlewareUtils,
	...databaseUtils,
	crashServer,
	createFailureResponse,
	createSuccessResponse,
	executeMiddlewares,
	extractClientFromCookie,
	isEventNameMatch,
	logEnvironments,
	passwordGenerator,
	resolveResponseError,
	sortEnvironments,
};
